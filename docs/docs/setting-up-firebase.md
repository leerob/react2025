---
title: Setting Up Firebase
---

[Firebase](https://firebase.google.com/) is the industry standard [NoSQL](https://en.wikipedia.org/wiki/NoSQL) platform. It has a sufficient user/permissions system and an easy interface for non-technical users. Plus, it mention it has a generous [free tier](https://firebase.google.com/pricing).

We'll utilize two features of Firebase in this course.

- **Authentication** – We _do not_ want to allow anonomous feedback to prevent bad actors. Thus, we will require logging in with a social media account. Firebase Authentication makes it easy to add login support for Facebook, Google, GitHub, and more.
- **Database** – Firebase's [Cloud Firestore](https://firebase.google.com/products/firestore/) will allow us to easily save information about users, pages, and feedback.

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

To start, let's focus on GitHub for social authentication. Later, we can add more providers. First, we need to create a [GitHub Application](https://developer.github.com/apps/building-github-apps/creating-a-github-app/).

#### Enable GitHub Sign-In

1. Inside the Firebase Console, click **Authentication**.
1. Click the **Sign-in method** tab.
1. Click **GitHub** and toggle the switch to enable.
1. Copy the callback URL.

#### Create GitHub App

1. In the upper-right corner of GitHub, click your profile photo, then click **Settings**.
1. In the left sidebar, click **Developer settings**.
1. In the left sidebar, click **GitHub Apps**.
1. Click **New GitHub App**.
1. In "GitHub App name", type the name of your app.
1. Optionally, in "Description", type a description of your app that users will see.
1. In "Homepage URL", type the full URL to your app's website. If you don't have a URL yet, you can use a valid placeholder URL.
1. In "User authorization callback URL", paste in the URL from the Firebase Console.
1. Disable "Active" webhook. We will not be using this.
1. Under "User permissions", grant "Read-only" access to "Email addresses".
1. Click **Create GitHub App**.
1. Copy **Client ID** and **Client secret**.

#### Conclusion

![Firebase Auth](/img/firebase-auth.png)

1. Return to the Firebase Console
1. Paste **Client ID** and **Client secret**.
1. Click **Save**.
