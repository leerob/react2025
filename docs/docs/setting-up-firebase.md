---
title: Setting Up Firebase
---

[Firebase](https://firebase.google.com/) is a Backend-as-a-Service (BaaS) built on Google Cloud.
It's an excellent way to build and grow applications. It's interface is easy to navigate and it has a generous [free tier](https://firebase.google.com/pricing).
Firebase ([Firestore](https://firebase.google.com/products/firestore/)) is categorized as a [NoSQL](https://en.wikipedia.org/wiki/NoSQL) database, which stores data in JSON-like documents.

We'll utilize two features of Firebase in this course.

- **Authentication** – In this application, we will require logging in with a social media account. Firebase Authentication makes it easy to add login support for Facebook, Google, GitHub, and more.
- **Database** – Firestore will allow us to easily save information about users, pages, and more.

### Create Database

1. If you do not have a Firebase account, create one first.
1. Create a new project.
1. Navigate to **Database** and click **Create Database**.
   ![Create Firebase Database](https://leerob.io/static/images/real-time-post-views/firebase/step1.png)
1. Start in test mode and click **Next**.
   ![Create Firebase Database](https://leerob.io/static/images/real-time-post-views/firebase/step2.png)
1. Choose your database location and click **Done**.
   ![Create Firebase Database](https://leerob.io/static/images/real-time-post-views/firebase/step3.png)

Success! You've just created your Firestore database. Now, let's save our credentials.

### Save Credentials

1. In the top left, click **Project Settings**.
   ![Create Firebase Database](https://leerob.io/static/images/real-time-post-views/firebase/step4.png)
1. Under **Your apps**, click web.
1. Add a nickname for your app and click **Register app**.
1. Save the `firebaseConfig` object and click **Continue to console**.
1. Navigate to the **Service Accounts** tab and click **Generate new private key**. Save the `.json` file.
   ![Create Firebase Database](https://leerob.io/static/images/real-time-post-views/firebase/step5.png)

We can now connect to our Firebase account from both the client-side and server-side.

### GitHub Authentication

To start, let's focus on GitHub for social authentication. Later, we can add more providers. First, we need to create a [GitHub OAuth Application](https://github.com/settings/applications/new).

#### Enable GitHub Sign-In

1. Inside the Firebase Console, click **Authentication**.
1. Click the **Sign-in method** tab.
1. Click **GitHub** and toggle the switch to enable.
1. Copy the callback URL.

#### Add Authorized Domains

By default, `localhost` is an authorized domain. As we deploy Firebase to production, we'll want to also add our domain to the list so we can log in.

1. Underneath the **Sign-in providers**, click **Add domain**.
1. Enter in the production URL for your application (e.g. fastfeedback.io)
1. Click **Add**.

#### Create GitHub OAuth App

1. Start [here](https://github.com/settings/applications/new).
1. In **Application name**, type the name of your app.
1. In **Homepage URL**, type the full URL to your app's website. If you don't have a URL yet, you can use a valid placeholder URL.
1. Optionally, in **Description**, type a description of your app that users will see.
1. In **Authorization callback URL**, paste in the URL from the Firebase Console.
1. Click **Register application**.
1. Copy **Client ID** and **Client secret**.

#### Conclusion

![Firebase Auth](/img/firebase-auth.png)

1. Return to the Firebase Console
1. Paste **Client ID** and **Client secret**.
1. Click **Save**.
