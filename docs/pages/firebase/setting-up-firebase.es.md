# Configurando Firebase

[Firebase](https://firebase.google.com/) es un Backend-as-a-Service (BaaS) construido sobre Google Cloud.
Es una forma excelente de construir y hacer crecer aplicaciones. La interfaz de Firebase es fácil de navegar y tiene un muy generoso [plan gratuito](https://firebase.google.com/pricing).
Firebase ([Firestore](https://firebase.google.com/products/firestore/)) está categorizada como una base de datos [NoSQL](https://en.wikipedia.org/wiki/NoSQL), la cual almacena datos como si fueran documentos en formato JSON.

Nosotros vamos a utilizar dos funcionalidades de Firebase en este curso.

- **Authentication** – En este aplicación, requerimos inicio de sesión con una cuenta de redes sociales. Firebase Authentication hace muy sencillo añadir inicio de sesión con Google, GitHub y más.
- **Database** – Firestore  nos permitirá almacenar información acerca de nuestros usuarios, páginas y mucho más de manera sencilla.

### Crear la Base de Datos

- Si no tienes una cuenta de Firebase, crea una primero.
- Crear un nuevo proyecto.
- Navega a **Firestore Database** y haz click en **Create Database**.
- Empieza en modo de test y haz click en **Next**.
  ![Create Firebase Database](/create-db.png)
- Elige la ubicación de tu base de datos y haz click en **Enable**.
  ![Create Firebase Database](/enable.png)

¡Enhorabuena! Acabas de crear una base de datos en Firestore. Ahora, vamos a almacenar nuestras credenciales.

### Guardar Credenciales

- En la esquina izquierda, haz click en **Project Settings**.
  ![Project Settings](/project-settings.png)
- Debajo de **Your apps**, haz click en web
  ![Create Web App](/create-app.png)
- Añade un apodo para tu app y haz click en **Register app**.
- Guarda el objeto `firebaseConfig` y clicka en **Continue to console**.
  ![Firebase Web App](/firebase-web-app.png)
- Navega a la pestaña de **Service Accounts** y haz click en **Generate new private key**. Guarda el archivo `.json`.
  ![Create Firebase Database](https://leerob.io/static/images/real-time-post-views/firebase/step5.png)

Ahora podemos conectarnos a nuestra cuenta de Firebase tanto desde el lado del cliente como del servidor. Necesitarás estos valores en la próxima sección cuando estemos creando las variables de entorno.

### Autenticación con GitHub

Para empezar, vamos a centrarnos en GitHub para el inicio de sesión con cuentas sociales. Más tarde podremos añadir más proveedores. Primero, vamos a crear una aplicación de GitHub OAuth.

#### Permitir inicio de sesión con GitHub

- Dentro de Firebase Console, click en **Authentication**.
- Haz click en la pestaña **Sign-in method**.
- Haz click en **GitHub** y habilita el inicio de sesión.
- Copia la URL de _callback_.

#### Crear una App de GitHub OAuth

- Empieza [aquí](https://github.com/settings/applications/new).
- En **Application name**, escribe el nombre de tu aplicación.
- En **Homepage URL**, escribe la URL concreta del sitio web de tu app. Si no tienes una URL todavía, puedes utilizar un _placeholder_ válido como URL.
- Opcionalmente, en **Description**, escribe una descripción de tu app que tus usuarios podrán ver.
- En **Authorization callback URL**, pega la URL que has obtenido en Firebase Console.
- Click en **Register application**.
- Copia el **Client ID** y **Client secret**.

![Firebase Auth](/firebase-auth.png)

- Vuelve a Firebase Console
- Pega el **Client ID** y **Client secret**.
- Click en **Save**.

#### Añadir Dominios Autorizados

Por defecto, `localhost` es un dominio autorizado. Cuando despleguemos Firebase a producción, también querremos añadir nuestro dominio al listado de forma que podamos iniciar sesión.

- Debajo de **Sign-in providers**, haz click en **Add domain**.
- Introduce la URL de producción de tu aplicación (por ejemplo, fastfeedback.io)
- Introduce la URL para las previsualizaciones de tus despliegues en Vercel -> `vercel.app`
- Haz click en **Add**.
