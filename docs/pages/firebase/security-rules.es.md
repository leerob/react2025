# Reglas de Seguridad

Las Reglas de Seguridad de Firebase se interponen entre tus datos y usuarios maliciosos. Puedes escribir tanto reglas simples como complejas que protejan los datos de tu app al nivel de granularidad que tu app en concreto requiera.

## Escribiendo Reglas

Todas las reglas de seguridad de Cloud Firestore consisten en declaraciones `match`, las cuales identifican documentos en tu base de datos, y expresiones `allow`, las cuales controlan el acceso a esos documentos:

Cada petición a la base de datos desde una librería de cliente a Cloud Firestore es evaluada contra estas reglas de seguridad antes de leer o escribir cualquier dato. Si las reglas deniegan el acceso a cualquier de las rutas del documento especificadas, la petición completa falla.

Por ejemplo, solo el propietario de un sitio debería ser capaz de borrar dicho sitio. Solo los usuarios deberían ser capaces de leer datos acerca de ellos mismos. En la parte inferior de las reglas, hay una variedad de funciones auxiliares definidas para simplificar tus comparadores o _matchers_.

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
