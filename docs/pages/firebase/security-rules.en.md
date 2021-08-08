# Security Rules

Firebase Security Rules stand between your data and malicious users. You can write simple or complex rules that protect your app's data to the level of granularity that your specific app requires.

## Writing Rules

All Cloud Firestore Security Rules consist of `match` statements, which identify documents in your database, and `allow` expressions, which control access to those documents:

Every database request from a Cloud Firestore mobile/web client library is evaluated against your security rules before reading or writing any data. If the rules deny access to any of the specified document paths, the entire request fails.

For example, only a site owner should be able to delete the site. Only users should be able to read data about themselves. At the bottom of the rules, there are a variety of helper functions defined to simplify your matchers.

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if isUser(uid);
    }

    match /feedback/{uid} {
      allow read: if true;
      allow delete: if isOwner() || isSiteOwner();
      allow update: if isOwner() && willBeOwner() || isSiteOwner() && willBeSiteOwner();
      allow create: if willBeOwner();
    }

    match /sites/{uid} {
      allow read: if isOwner();
      allow delete: if isOwner();
      allow update: if isOwner() && willBeOwner();
      allow create: if willBeOwner();
    }
  }
}

function isUser(uid) {
  return isSignedIn() && request.auth.uid == uid;
}

function isSignedIn() {
  return request.auth.uid != null;
}

function isOwner(){
  return isUser(currentData().authorId);
}

function isSiteOwner(){
  return isUser(currentData().siteAuthorId);
}

function willBeOwner(){
  return isUser(incomingData().authorId);
}

function willBeSiteOwner(){
  return isUser(incomingData().siteAuthorId);
}

function currentData() {
  return resource.data;
}

function incomingData() {
  return request.resource.data;
}
```
