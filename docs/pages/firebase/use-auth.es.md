# Hook de Autenticación

React permite componer funcionalidades dentro de [hooks reusables](https://reactjs.org/docs/hooks-intro.html). Dentro de cualquier componente, queremos poder acceder al `user` actual y permitirles iniciar o cerrar sesión. Para conseguir esto, vamos a construir un hook personalizado llamado `useAuth`.

La API de `useAuth` es sencilla para empezar:

- `user` – El usuario actual, si existe.
- `signinWithGitHub` – Una función para realizar el inicio de sesión con GitHub.
- `signout` – Una función para cerrar sesión y eliminar los datos.

Para hacer que estos valores están disponibles a través de nuestra aplicación al completo, utilizaremos [React Context](https://reactjs.org/docs/context.html). Context proporciona una forma de pasar datos a través del árbol de componentes sin tener que pasar _props_ de forma manual hacia abajo en cada nivel.

Context está diseñado para compartir datos que pueden ser considerados “globales” para un árbol de componentes de React, como el usuario actual. Vamos a crear un fichero llamado `lib/auth.js` y un proveedor de Context (_Context provider_).

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

Te habrás dado cuenta que hemos definido la API de nuestro hook, pero no hemos creado todavía las funciones. Vamos a añadir la lógica para iniciar y cerrar sesión y persistir los datos del usuario actual.

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

Cuando un usuario inicia sesión con GitHub, usamos el `GithubAuthProvider`  y la aplicación de GitHub creada anteriorme para conseguir la información acerca de ese usuario. Después, guardamos el `response.user` en el estado local dentro de ese hook.

Cuando un usuario cierra sesión, o el componente ya no está siendo usado, eliminamos la suscripción y ponemos el usuario a `false`.

### Consumiendo

El Hook de React `useAuth` nos permite iniciar sesión, cerrar sesión y traer información sobre el usuairo. Vamos a testear esto para asegurarnos de que está configurado correctamente.

Primero, vamos a envolver nuestra aplicación con el `AuthProvider` para acceder al contexto.

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

Después, modificamos el fichero `pages/index.js` para incluir el siguiente código.

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

Ahora deberías ser capaz de iniciar sesión con GitHub y ver tu dirección de correo electrónico. El objeto `auth.user` deberá parecerse a algo como esto.

```json
{
  "uid": "WG2acuO8oqW3Np0EXCSn28E19Rs2",
  "email": "course@leerob.io",
  "name": "Lee Robinson",
  "provider": "github.com"
}
```

### Desplegando

Vamos a tomar la oportunidad de desplegar en producción nuestra aplicación.
Ya hemos definido nuestras [variables de entorno](https://vercel.com/docs/v2/build-step#environment-variables) localmente, pero no las hemos configurado para todos los entornos. La separación de entornos es importante porque eventualmente tendremos una base de datos separada para producción.

#### Entornos

- **Producción** – Cuando esté seleccionado, la variable de entorno será aplicada a tu próximo despligue en producción. Para crear un despliegue en producción, subiremos el _commit_ a la rama por defecto de Git o ejecutaremos `vercel --prod`.
- **Previsualización** – La variable de entorno será aplicada a tu próximo despligue en previsualización. Los despliegues en previsualización son creados cuando hacemos _push_ a una rama (por ejemplo, `my-new-feature`) o ejecutamos `vercel`.
- **Desarrollo** – La variable de entorno es usada cuando ejecutamos nuestro proyecto localemente, con `vercel dev` o con nuestro comando de desarrollo preferido. Para descargar las variables de entorno de desarrollo, ejecuta `vercel env pull`.

Dentro del _dashboard_ de Vercel (por ejemplo, `https://vercel.com/your-account/project/settings/general`) añade la variables de entorno de Firebases. Después, despliega tu aplicación utilizando el flujo de trabajo que prefieras (enviando un commit o a través del CLI de `vercel`).

### Bonus: Inicio de sesión con Google

Ahora que ya tenemos un hook reusable para iniciar ssión en nuestra aplicación, es muy sencillo extender el hook `useAuth` para añadir soporte para iniciar sesión con Google (o cualquier otro proveedor).

- Dentro de Firebase Console, dirígete a **Authentication**
- Haz click en **Sign-in method**
- Habilita Google

Después, podemos añadir una nueva función a `useAuth` para iniciar sesión con Google. Podemos incluso extender estas funciones para añadir redirecciones en caso de éxito.

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
