# Descripción del Producto

En este curso construiremos [Fast Feedback](https://fastfeedback.io) – la forma más rápida de añadir reviews y comentarios a tu sitio estático.

Cuando estaba realizando la lluvia de ideas de productos para este curso, necesitaba algo que disfrutara creando. Además, necesitaba ser lo suficientemente complejo para gestionar la autenticación de usuarios, almacenamiento en base de datos y pagos. Después de iterar sobre algunos pensamientos, la idea de [Fast Feedback](https://fastfeedback.io) vino hacia mí.

![Review](/review.png)

Los blogs son una parte esencial de Internet. Estos son un diálogo abierto entre el autor y su audiencia. Sin embargo, se están convirtiendo cada vez más en una comunicación unidireccional. Añadir comentarios a tu blog es difícil, especialmente con el ascenso de los generadores estáticos de sitios como Next.js o Gatsby.

La mayoría de las personas utilizando estos frameworks _quieren_ comentarios, pero no quieren la sobrecarga de construir el sistema de comentarios por ellos mismos. Para añadir comentarios, tienes que considerar:

- ¿Quieres permitir que _cualquiera_ comente? ¿Deberían las personas iniciar sesión?
- ¿Qué pasa si las personas abusan del sistema? ¿Cómo puedo moderar?
- ¿Esto impactará en la privacidad de mis lectores?
- ¿Haré que se reduzca el rendimiento de mi sitio?

Fast Feedback responde a todas estas preguntas por ti. Con una sola línea de código, puedes añadir comentarios y reviews a tu sitio estático con **cualquier framework** y **cualquier lenguaje**.

- Evitar el spam haciendo que los usuarios inicien sesión con sus cuentas sociales.
- Los autores tienen herramientas de moderación para aprobar o rechazar los comentarios.
- Funciona bien para blogs, sitios de e-commerce, e-books, cursos, etc.
- Sin tracking ni publicidad. Solo feedback rápido de tus usuarios.
- No es necesario JavaScript. Solo una línea para incrustar un `iframe` estático.

## ¿Cómo funciona?

La principal diferencia entre Fast Feedback y otras herramientas es que puedes añadir feedback en solo **una línea de código**.
Por ejemplo, esto mostrará los comentarios de Fast Feedback.

```html
<iframe
  src="https://fastfeedback.io/embed/7QUdWsz58EDnHsdub7UW/EAXJmnnTL1f6CUGeZrNI"
/>
```

Vamos a analizar esta URL.

- `https://fastfeedback.io/embed/${SITE_ID}` - Esta ruta muestra todo el feedback para un sitio dado. El feedback es presentado con un diseño limpio y minmalista, incluyendo un enlace para iniciar sesión y dejar feedback.
- `/${ROUTE_ID}` - Esta parámetro opcional te permite trackear desde qué ruta viene el feedback. Esto te permite utilizar el mismo `SITE_ID` para un blog, por ejemplo.

Podemos **no usar JavaScript** sirviendo un sitio estático a través de un `iframe`. Te estarás entonces preguntando – ¿cómo el feedback se actualiza entonces? Utilizando la [Regeneración Estática Incremental](https://nextjs.org/blog/next-9-4#incremental-static-regeneration-beta) de Next.js, podemos regenerar periódicamente la página estática para mostrar todos los comentarios que han sido aprobados.

## Esquema de la Base de Datos

**User**

| Nombre       |   Tipo   |                    Descripción |
| :----------- | :------: | -----------------------------: |
| `uid`        | `String` |         UID de Firebase Auth   |
| `email`      | `String` |    Email desde un login social |
| `name`       | `String` |   Nombre desde un login social |
| `photoUrl`   | `String` |   Avatar desde un login socian |
| `provider`   | `String` |   Qué login social se ha usado |
| `stripeRole` | `String` |       (Free, Starter, Premium) |
| `stripeId`   | `String` | Vincular al cliente con Stripe |
| `status`     | `String` |   (Active, Suspended, Deleted) |

**Feedback**

| Nombre      |   Tipo   |                    Descripción |
| :---------- | :------: | -----------------------------: |
| `author`    | `String` |   Nombre desde un login social |
| `authorId`  | `String` |           UID de Firebase Auth |
| `createdAt` | `String` |            Marca de tiempo ISO |
| `provider`  | `String` |   Qué login social se ha usado |
| `rating`    | `Number` |            Valoración opcional |
| `siteId`    | `String` | De qué sitio viene el feedback |
| `status`    | `String` |   (Pending, Approved, Removed) |
| `text`      | `String` |         Contenido del feedback |

**Site**

| Nombre      |   Tipo   |                                      Descripción |
| :---------- | :------: | -----------------------------------------------: |
| `authorId`  | `String` |                             UID de Firebase Auth |
| `createdAt` | `String` |                              Marca de tiempo ISO |
| `name`      | `String` |                                 Nombre del sitio |
| `settings`  | `Object` | (Valoraciones, logos sociales, marcas de tiempo) |
| `url`       | `String` |                                    Link al sitio |
