# Guardando Datos de Usuario

Firebase Authentication no proporciona una forma directa de añadir más información acerca de un usuario. En su lugar, debemos crear una nueva tabla `users` con Firestore donde añadirás información adicional para cada usuario.

Para este producto, queremos saber qué nivel de precio tiene el usuario para así determinar sus límites de uso. Queremos saber además el `provider`, de forma que podamos mostrar con qué plataforma el usuario se ha autenticado.

### Crear / Actualizar Usuario

Vamos a crear un nuevo fichero `lib/db.js` para realizar [acciones CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) en la base de datos.

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

### Actualizar el Hook de Auth

Ahora, vamos a utilizar la función `createUser` dentro de nuestro hook `useAuth`.

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

## Testeando

Borrar tu usuario desde la consola de Firebase. Después, vuelve a iniciar sesión con GitHub. Ahora deberás ver una nueva fila en la tabla `users` en Firestore.

![Firestore User Table](/firestore-user-created.png)
