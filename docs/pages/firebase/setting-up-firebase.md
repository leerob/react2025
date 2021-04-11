# Setting Up Firebase

[Firebase](https://firebase.google.com/) is a Backend-as-a-Service (BaaS) built on Google Cloud.
It's an excellent way to build and grow applications. Firebase's interface is easy to navigate, and it has a generous [free tier](https://firebase.google.com/pricing).
Firebase ([Firestore](https://firebase.google.com/products/firestore/)) is categorized as a [NoSQL](https://en.wikipedia.org/wiki/NoSQL) database, which stores data in JSON-like documents.

We'll utilize two features of Firebase in this course.

- **Authentication** – In this application, we will require logging in with a social media account. Firebase Authentication makes it easy to add login support for Google, GitHub, and more.
- **Database** – Firestore will allow us to easily save information about users, pages, and more.

### Create Database

- If you do not have a Firebase account, create one first.
- Create a new project.
- Navigate to **Firestore Database** and click **Create Database**.
- Start in test mode and click **Next**.
  ![Create Firebase Database](/create-db.png)
- Choose your database location and click **Enable**.
  ![Create Firebase Database](/enable.png)

Success! You've just created your Firestore database. Now, let's save our credentials.

### Save Credentials

- In the top left, click **Project Settings**.
  ![Project Settings](/project-settings.png)
- Under **Your apps**, click web.
  ![Create Web App](/create-app.png)
- Add a nickname for your app and click **Register app**.
- Save the `firebaseConfig` object and click **Continue to console**.
  ![Firebase Web App](/firebase-web-app.png)
- Navigate to the **Service Accounts** tab and click **Generate new private key**. Save the `.json` file.
  ![Create Firebase Database](https://leerob.io/static/images/real-time-post-views/firebase/step5.png)

We can now connect to our Firebase account from both the client-side and server-side. You'll need these values in the next section when we're creating environment variables.

### GitHub Authentication

To start, let's focus on GitHub for social authentication. Later, we can add more providers. First, we need to create a GitHub OAuth Application.

#### Enable GitHub Sign-In

- Inside the Firebase Console, click **Authentication**.
- Click the **Sign-in method** tab.
- Click **GitHub** and toggle the switch to enable.
- Copy the callback URL.

#### Create GitHub OAuth App

- Start [here](https://github.com/settings/applications/new).
- In **Application name**, type the name of your app.
- In **Homepage URL**, type the full URL to your app's website. If you don't have a URL yet, you can use a valid placeholder URL.
- Optionally, in **Description**, type a description of your app that users will see.
- In **Authorization callback URL**, paste in the URL from the Firebase Console.
- Click **Register application**.
- Copy **Client ID** and **Client secret**.

![Firebase Auth](/firebase-auth.png)

- Return to the Firebase Console
- Paste **Client ID** and **Client secret**.
- Click **Save**.

#### Add Authorized Domains

By default, `localhost` is an authorized domain. As we deploy Firebase to production, we'll want to also add our domain to the list so we can log in.

- Underneath the **Sign-in providers**, click **Add domain**.
- Enter in the production URL for your application (e.g. fastfeedback.io)
- Enter in the URL for your Vercel preview deploys -> `vercel.app`
- Click **Add**.
