---
title: Authentication Hook
---

React allow us to compose functionality into [reusable hooks](https://reactjs.org/docs/hooks-intro.html). Inside any component, we want to be able to access the current `user` and allow them to sign in or out. To accomplish this, let's create a custom `useAuth` hook.

The API for `useAuth` is fairly small:

- `user` – The current user, if any.
- `signinWithGitHub` – A function to initiate signing into GitHub.
- `signout` – A function to sign the user out and clear the session.

To make these values avaiable throughout our entire application, we'll use [React Context](https://reactjs.org/docs/context.html). Context provides a way to pass data through the component tree without having to pass props down manually at every level.

Context is designed to share data that can be considered “global” for a tree of React components, like the current user. Let's create a new file `util/firebase.js` and create a Context provider.

**`util/auth.js`**

```javascript {11,12,13}
import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from './firebase';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  return {
    user: null,
    signinWithGitHub: null,
    signout: null
  };
}
```

You'll notice we've defined our hook's API, but have not created the functions. Let's add the logic to sign in and out and persist the current user.

**`util/auth.js`**

```javascript {16,30,37,51,52,53}
import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from './firebase';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);

      setUser(user);
      return user;
    } else {
      setUser(false);
      return false;
    }
  };

  const signinWithGitHub = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => handleUser(response.user));
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGitHub,
    signout
  };
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId
  };
};
```

When a user signs in with GitHub, we use the `GithubAuthProvider` and the GitHub app created earlier to fetch information about the user. Then, we save the `reponse.user` into local state inside this hook.

When a user signs out, or the component is no longer being used, we unsubscribe and set the user to `false`.

### Consuming

The `useAuth` React Hook allows us to sign in, sign out, and fetch information about the user. Let's test this out to ensure it's set up correctly.

Modify the file `pages/index.js` to include the following code.

**`pages/index.js`**

```javascript
import { useAuth } from '../util/auth';

export default function Index() {
  const auth = useAuth();

  return auth.user ? (
    <div>
      <p>Email: {auth.user.email}</p>
      <button onClick={(e) => auth.signout()}>Sign Out</button>
    </div>
  ) : (
    <button onClick={(e) => auth.signinWithProvider('github')}>Sign In</button>
  );
}
```

You should now be able to sign in with GitHub and view your email address. The `auth.user` object will look like this.

```json
{
  "uid": "WG2acuO8oqW3Np0EXCSn28E19Rs2",
  "email": "course@leerob.io",
  "name": "Lee Robinson",
  "provider": "github.com"
}
```
