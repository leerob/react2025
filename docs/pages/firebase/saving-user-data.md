# Saving User Data

Firebase Authentication doesn't provide a way to directly add more information about a user. Instead, you need to create a new `users` table with Firestore where you'll add additional information for each user.

For this product, we want to know what pricing tier the user has so we can determine their usage limits. We also want to know the `provider` so we can show which platform the user authenticated with.

### Create / Update User

Let's create a new file `lib/db.js` to perform [CRUD actions](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) on the database.

**`lib/db.js`**

```js
import firebase from './firebase'

const firestore = firebase.firestore()

export function updateUser(uid, data) {
  return firestore.collection('users').doc(uid).update(data)
}

export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true })
}
```

### Update Auth Hook

Now, let's consume the `createUser` function inside our `useAuth` hook.

**`lib/auth.js`**

```javascript {3,23}
import React, { useState, useEffect, useContext, createContext } from 'react'
import firebase from './firebase'
import { createUser } from './db'

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

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser)

      createUser(user.uid, user)
      setUser(user)
      return user
    } else {
      setUser(false)
      return false
    }
  }

  const signinWithGitHub = () => {
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

## Testing

Delete your user from the Firebase Console. Then, re-sign in with GitHub. You should now see a new row in the `users` table in Firestore.

![Firestore User Table](/firestore-user-created.png)
