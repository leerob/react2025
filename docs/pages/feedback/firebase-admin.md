# Firebase (Server-Side)

When utilizing `getStaticProps` / `getStaticPaths`, we are communicating directly with the server.
This means we need to initialize Firebase Admin to communicate server-to-server.

## Installation

First, we need to install the `firebase-admin` server-side SDK.

```bash
$ yarn add firebase-admin
```

## Environment Variables

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

Make sure you include the quotes around "your-value-here" for `FIREBASE_PRIVATE_KEY`.

import Callout from 'nextra-theme-docs/callout'

<Callout emoji="⚠️">
You will need to restart your application to load new environment variables.
</Callout>

## Connecting to Firebase

Create a new file `lib/firebase-admin.js` to initialize the application and establish a connection.

**`lib/firebase-admin.js`**

```javascript
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY,
      client_email: process.env.FIREBASE_CLIENT_EMAIL
    }),
    databaseURL: 'YOUR_DATABASE_URL_HERE'
  });
}

export default admin.firestore();
```

<Callout>
By default, Firebase sets your databaseURL to `'https://your-app-id.firebaseio.com'`
</Callout>

## Retrieving Data

Finally, lets create `lib/db-admin.js` to fetch data from Firestore.
This function will fetch all `Feedback` where the `siteId` matches.

**`lib/db-admin.js`**

```js
import db from './firebase-admin';

export async function getAllFeedback(siteId) {
  try {
    const snapshot = await db
      .collection('feedback')
      .where('siteId', '==', siteId)
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

## Deploying

When adding your Firebase private key inside the Vercel dashboard, ensure that you
convert new line characters (`\n`) to actual new lines. For example, here's a fake private key.

```
-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkdhkiG9w0BAQEFABBBBKYwggSiAgEAAoIBAQClyaHok1jDXoVg
JDbtpaNeR7tdHTIwpplhfzXBWBsYc+aTIKZssYYJoFQ6RIV4ky5Kau05CrAoUSAr
FWuuqbtnW/2pTiG2YNwmEMDOMWusdWnMDyyTtx7krA1BZuQ1HrrNjhoNvMpBnO9o
ELBo/BQbhDg7lhv1VWjsfRIFNBKkEG7qPkRZ2FUvbXlpsPueJbEREe4IYCKlhvJA
LsoG5HfdePv+7Bhv2IXBd3+JZhP+LnWeAxvsxmUYA4Q1sF/ItfMRLvX/b3c6UyQh
X+hn7KrsUPIuITJmWI+27tzt0Hz8W2JXy47PpSW3+xyPuLfnGZREbQDGiPT9tLPb
1Go9FpWvAgMBAAECggEAFY8/F7bvIjrXJZxTVVX+IbM06YV/H/z5j08pUVcN4Xhr
ns/pI89abTLtCNQam4iFxsp+uKt+ISPDEBsw+YvElkvWnhdEKiYjTwtsOPcU1V5S
N3vbEkAU1TjiWZ7zL0IcleWAuX342gN+7JEQkAAfFxvWCV8fsjQ7BGuix+7sZ1xP
OxaD9PCcT4CHm093ksn2uv0BcQD1ect0zxlyjKyBiDLwwUWmDRgeZwNw0ca09TAd
QVvB9tewXmSQfXaim9Cm8bU1sN3kUSLWZf1ItU9cC0EUFnf3cttqyDfviYi0gg9p
7uAdbFka89vz3O3d/b+M8YrDqVvduJuqpAphr+v7sQKBgQDmSqaQ09uBs/G4KvcB
yzF1zjD1moeIZ/EnifNQ1/fs+0gbgthHFpH2ZCn7XAc0veF6nqSaUxSUVOAujfgP
xlOxt+q56iZ+LpQzemgZDOeclIdqSEJ3kNP1QhNtVvhdWfJtVO4ctvt2ZOKKgXnf
u2hFwiV4W5JKWWFNZD7E3jA6nQKBgQC3yp3H6NLpKrK4UrRgrwVwu7ox8YTFxfmG
k4k/mul7GxegMaCKgvf4xibg8WnvAszB6wdqdOtp5HsEmAMUG3LjRwyJEQs6niJJ
WxH4YHg5deONTbG9NLDUGW4Frq577zfj3jKwsIWE/5zczFn04S1NRyfsdzMVoP01
8qvSPClJuwKBgAj0/FeDtfTsf8lO+n56XbkcRPE4im72w/1qsykAzWbNOze+tcUe
Dp1LtgpNwQX/IKb5RqOt+Y3vYyzMXsqWRykRYhLJ9adQvnjmGOhohRWk/UNX/iXS
XzwZztGg4VYYKoKwG/bH8y3erKUAdjIKgvq7m2N8BEuaAFvXO03C6pNNAoGALski
TyBiiD55TlinWDFVljQDmvEbVmkmMu7dslZR9yeXZQ0dDAV48Fgoz3xE9jXlP7v/
oEbxInyqICo+JmEyZs7QTxgKnrpgigHn2i1cjWwIKBFOHJcMKIHssv+bpSrpNFV8
2+OjqY6UNNTEVYT4zkI91IEnfOsFajVDLfponD8CgYBajSsT31li/QB2GT7vYexT
dkAg3WB7iX/RLzt81H4fpN3HXd0BklSlWLZDLu9Cmd+XgA1iKHL+pLkaocs1zM/L
ZGUJECjLVIPDySOUcX7SGTrChN3Q1Rn0dXdUsrWkBWopGmtz1D99aIzfylXnnyjQ
IlpxVgdxp5tb9JOG3aoMMg==
-----END PRIVATE KEY-----
```

Note the extra new line at the end.
