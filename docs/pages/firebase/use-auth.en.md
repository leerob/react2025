# Authentication Hook

React allows us to compose functionality into [reusable hooks](https://reactjs.org/docs/hooks-intro.html). Inside any component, we want to be able to access the current `user` and allow them to sign in or out. To accomplish this, let's create a custom `useAuth` hook.

The API for `useAuth` is simple to start:

- `user` – The current user, if any.
- `signinWithGitHub` – A function to initiate signing into GitHub.
- `signout` – A function to sign the user out and clear the session.

To make these values available throughout our entire application, we'll use [React Context](https://reactjs.org/docs/context.html). Context provides a way to pass data through the component tree without having to pass props down manually at every level.

Context is designed to share data that can be considered “global” for a tree of React components, like the current user. Let's create a new file `lib/auth.js` and create a Context provider.

**`lib/auth.js`**

```javascript {11,12,13}
import React, { useState, useEffect, useContext, createContext } from 'react'
import firebase from './firebase'

const authContext = createContext()

export function AuthProvider({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  return {
    user: null,
    signinWithGitHub: null,
    signout: null,
  }
}
```

You'll notice we've defined our hook's API, but have not created the functions. Let's add the logic to sign in and out and persist the current user.

**`lib/auth.js`**

```javascript
import React, { useState, useEffect, useContext, createContext } from 'react'
import firebase from './firebase'

const authContext = createContext()

export function AuthProvider({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser)

      setLoading(false)
      setUser(user)
      return user
    } else {
      setLoading(false)
      setUser(false)
      return false
    }
  }

  const signinWithGitHub = () => {
    setLoading(true)
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => handleUser(response.user))
  }

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false))
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser)

    return () => unsubscribe()
  }, [])

  return {
    user,
    loading,
    signinWithGitHub,
    signout,
  }
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  }
}
```

When a user signs in with GitHub, we use the `GithubAuthProvider` and the GitHub app created earlier to fetch information about the user. Then, we save the `response.user` into local state inside this hook.

When a user signs out, or the component is no longer being used, we unsubscribe and set the user to `false`.

### Consuming

The `useAuth` React Hook allows us to sign in, sign out, and fetch information about the user. Let's test this out to ensure it's set up correctly.

First, we need to wrap our application with `AuthProvider` to access the context.

**`pages/_app.js`**

```javascript
import { AuthProvider } from '../lib/auth'

const App = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default App
```

Then, modify the file `pages/index.js` to include the following code.

**`pages/index.js`**

```javascript
import { useAuth } from '../lib/auth'

export default function Index() {
  const auth = useAuth()

  return auth.user ? (
    <div>
      <p>Email: {auth.user.email}</p>
      <button onClick={(e) => auth.signout()}>Sign Out</button>
    </div>
  ) : (
    <button onClick={(e) => auth.signinWithGitHub()}>Sign In</button>
  )
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

### Deploying

Let's take this opportunity to deploy our application.
We've already set up our [environment variables](https://vercel.com/docs/v2/build-step#environment-variables) locally, but we haven't configured them for all environments. Separation of environment is important because eventually we'll have a separate database for production.

#### Environments

- **Production** – When selected, the Environment Variable will be applied to your next Production Deployment. To create a Production Deployment, push a commit to the default branch or run `vercel --prod`.
- **Preview** – The Environment Variable is applied to your next Preview Deployment. Preview Deployments are created when you push to a branch (for example, `my-new-feature`) or run `vercel`.
- **Development** – The Environment Variable is for use when running your project locally, with `vercel dev` or your preferred development command. To download Development Environment Variables, run `vercel env pull`.

Inside the Vercel dashboard (e.g., `https://vercel.com/your-account/project/settings/general`) add the Firebase environment variables. Then, deploy your application using whichever workflow you prefer (pushing a commit or though the `vercel` CLI).

### Bonus: Sign-In With Google

Now that we have a reusable hook to log into our application, it's very easy to extend `useAuth` to add support for sign in with Google (or any other provider).

- Inside the Firebase Console, go to **Authentication**
- Click on **Sign-in method**
- Enable Google

Then, we can add a new function to `useAuth` to sign in with Google. We can also extend these functions to add redirects on success.

**`lib/auth.js`**

```js
import Router from 'next/router'

const signinWithGoogle = (redirect) => {
  setLoading(true)
  return firebase
    .auth()
    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((response) => {
      handleUser(response.user)

      if (redirect) {
        Router.push(redirect)
      }
    })
}
```
