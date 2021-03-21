# Adding Firebase Client-Side

Now that we've set up Firebase for authentication and storing data, we need to add it to our application.

### Installation

First, we need to install the `firebase` client-side SDK.

```bash
$ yarn add firebase@7.17.1
```

This course uses `v7.17.1` of Firebase. If you'd prefer to use a later version, please see [this issue](https://github.com/leerob/fastfeedback/issues/25).

### Environment Variables

Next.js comes with built-in support for environment variables. To connect to Firebase, we need to provide our secrets from earlier.
We do not want to commit secrets to git, so we should use [environment variables](https://nextjs.org/docs/basic-features/environment-variables).

To add environment variables with Next.js, you need to create an `.env` and `.env.local` file.

- `.env` can contain _any_ environment variables. We will commit this file. It's helpful to include this with empty values for secrets to show all the environment variables in use.
- `.env.local` will contains our secrets. We **do not** commit this file.

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

The `NEXT_PUBLIC_` prefix [makes the secrets available](https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables) in our client-side Next.js application.

import Callout from 'nextra-theme-docs/callout'

<Callout emoji="✅">
For example, Next.js will replace `process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID` with its value `your-app-1j324`.
</Callout>

### Firebase Client

We can now securely connect to Firebase. Create a new file `lib/firebase.js` to initialize the application and establish a connection. We only need to establish the connection once, hence the `if` statement.

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
