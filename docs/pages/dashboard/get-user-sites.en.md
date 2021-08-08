# Get User Sites

Now that our dashboard is set up to fetch sites, complete with a loading state, we need to scope the list of sites to _only_ the user's sites. We also want to do this in a secure way so that only you can access your own sites.

To ensure the security of your site data, we need to verify the Firebase ID token on the server. This checks the [JWT](https://jwt.io/) (JSON Web Token) to ensure you are who you say you are. First, we need to make a few small changes to our `useAuth` hook to grab the token.

**`lib/auth.js`**

```js
const user = formatUser(rawUser)
const { token, ...userWithoutToken } = user

createUser(user.uid, userWithoutToken)
setUser(user)

// ..

const formatUser = async (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: user.xa,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  }
}
```

We don't need to save the token to the database, but we do want it available on the user object returned from `useAuth`. Now, we can forward this token to our API route. If there's a user (logged in), then forward the token to the specified route.

**`pages/sites.js`**

```js
const { user } = useAuth()
const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher)
```

This requires a small change to our `fetcher` to forward the user token.

**`utils/fetcher.js`**

```js
const fetcher = async (url, token) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  })

  return res.json()
}

export default fetcher
```

### Database Query

Rather than `getAllSites`, we need to get only the sites for a user. Plus, let's sort them by the time they were created. Then, we can use this function inside `/api/sites`.

**`lib/db-admin.js`**

```js
export async function getUserSites(uid) {
  const snapshot = await db
    .collection('sites')
    .where('authorId', '==', uid)
    .get()

  const sites = []

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() })
  })

  sites.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  )

  return { sites }
}
```

### Verifying ID Tokens

Inside our API route, we need to [verify the ID token](https://firebase.google.com/docs/auth/admin/verify-id-tokens). Let's update our Firebase Admin instance to also export `auth`.

**`lib/firebase-admin.js`**

```js
import admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY,
      project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    }),
    databaseURL: 'https://fast-feedback-demo.firebaseio.com',
  })
}

const db = admin.firestore()
const auth = admin.auth()

export { db, auth }
```

Now, we can securely fetch the given user's sites.

**`api/sites.js`**

```js
import { auth } from '@/lib/firebase-admin'
import { getUserSites } from '@/lib/db-admin'

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token)
    const { sites } = await getUserSites(uid)

    res.status(200).json({ sites })
  } catch (error) {
    res.status(500).json({ error })
  }
}
```
