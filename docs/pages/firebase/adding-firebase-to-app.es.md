# Añadiendo Firebase en el lado del Cliente

Ahora que hemos configurado Firebase para la autenticación y almacenamiento de datos, necesitamos añadirlo a nuestra aplicación.

### Instalación

Primero, necesitamos instalar el SDK del lado del cliente de `firebase`.

```bash
$ yarn add firebase@7.17.1
```

Este curso utiliza la versión `v7.17.1` de Firebase. Si prefieres utilizar una versión más reciente, por favor revisa [este problema](https://github.com/leerob/fastfeedback/issues/25).

### Variables de Entorno

Next.js viene con soporte nativo para variables de entorno. Para conectarse a Firebase, necesitamos proporcionar los códigos secretos mencionados antes.
No queremos hacer _commit_ en git de estos secretos, por lo que deberemos usar [variables de entorno](https://nextjs.org/docs/basic-features/environment-variables).

Para añadir variables de entorno a Next.js, necesitas crear uno archivos `.env` y `.env.local`.

- `.env` puede contener _cualquier_ variable de entorno. De este archivo sí haremos commit. Es útil incluir este archivo con valores vacíos para mostrar todas las variables de entorno que se usan.
- `.env.local` contendrá nuestros secretos. **No haremos** _commit_ de este archivo.

**`.env`**

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
```

**`.env.local`**

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCes_HM5fdsJOU352-asdf253HKsd
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app-1j324.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-app-1j324
```

El prefijo `NEXT_PUBLIC_` [hace que los secretos estén disponibles](https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables) en el lado del cliente de nuestra aplicación de Next.js.

import Callout from 'nextra-theme-docs/callout'

<Callout emoji="✅">
Por ejemplo, Next.js reemplazará `process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID` por el valor `your-app-1j324`.
</Callout>

### Cliente de Firebase

Ahora podemos conectarnos de forma segura a Firebase. Creamos un nuevo fichero `lib/firebase.js` para inicializar la aplicación y establecer la conexión. Solo necesitamos establecer la conexión una vez, de ahí la condición `if`.

**`lib/firebase.js`**

```javascript
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  });
}

export default firebase;
```
