---
title: Firebase (Server-Side)
---

When utilizing `getStaticProps` / `getStaticPaths`, we are communicating directly with the server.
This means we need to initialize Firebase Admin to communciate server-to-servier.

### Installation

First, we need to install the `firebase-admin` server-side SDK.

```bash
yarn add firebase-admin
```

### Environment Variables

Next, we need to modify our `.env` and `.env` local files to add the values for the Firebase service account `.json` file.
Specifically, `private_key` and `client_email`.

**`.env`**

```
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
```

**`.env.local`**

```
FIREBASE_PRIVATE_KEY="your-value-here"
FIREBASE_CLIENT_EMAIL=your-value-here
```

:::note

Make sure you include the quotes around "your-value-here" for `FIREBASE_PRIVATE_KEY`.

:::

:::caution

You will need to restart your application to load new environment variables.

:::

### Firebase Admin

Create a new file `util/firebase-admin.js` to initialize the application and establish a connection.

**`util/firebase-admin.js`**

```javascript
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY,
      client_email: process.env.FIREBASE_CLIENT_EMAIL
    }),
    databaseURL: 'https://fast-feedback-demo.firebaseio.com'
  });
}

export default admin.firestore();
```

### Retrieving Data

Finally, lets create `util/db-admin.js` to fetch data from Firestore.
This function will fetch all `Feedback` where the `pageId` matches.

**`util/db-admin.js`**

```js
import firebase from './firebase-admin';

export async function getAllFeedback(pageId) {
  try {
    const snapshot = await firebase
      .collection('feedback')
      .where('pageId', '==', pageId)
      .get();
    const feedback = [];

    snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });

    return { feedback };
  } catch (error) {
    return { error };
  }
}
```
