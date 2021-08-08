# Despliegue con Vercel

[Vercel](https://vercel.com/) es una plataforma todo-en-uno con una CDN Global que soporta despliegues estáticos y de JAMstack, así como funciones _serverless_. Está hecho por los creadores de Next.js y tiene soporte de primera clase para aplicaciones de Next.js. Cuando despliegas tu aplicación de Next.js en Vercel, lo siguiente pasa por defecto:

- Las páginas que utilizan Generación Estática y los _assets_ (JS, CSS, fuentes, etc) automáticamente serán servidos por la [Vercel Edge Network](https://vercel.com/edge-network), la cual es extremadamente rápida.
- Las páginas que utilizan renderizado en el lado del servidor y las API routes automáticamente estarán aisladas como [funciones serverless](https://vercel.com/docs/v2/serverless-functions/introduction). Esto permite escalar infinitamente el renderizado de las páginas y las peticiones de la API.

**Vercel es como AWS para desarrolladores fron-end.** Además tiene soporte para:

- **Dominios personalizados:** una vez deplegada tu app en Vercel puedes asignar un [dominio personalizado](https://vercel.com/docs/v2/custom-domains) a tu app de Next.js.
- **Environment Variables:** puedes también definir [variables de entorno](https://zeit.co/docs/v2/build-step#environment-variables) en Vercel. Después, puedes [utilizar estas variables de entorno](https://nextjs.org/docs/api-reference/next.config.js/environment-variables) en tu app de Next.js.
- **HTTPS automático:** HTTPS está habilitado por defecto (incluyendo dominios personalizados) y no requiere ninguna configuración adicional. También auto-renueva los certificados SSL.

Vercel hizo un gran descubrimiento cuando se dio cuenta de que los despliegues en previsualización o _preview_ con URLs son una gran herramienta para equipos de front-end. Ellos crearon un flujo de trabajo para el despliegue / revisión de código en tiempo real — similar a la previsualización en un CMS, pero por medio de la [integración con Git y el despliegue con cada push](https://vercel.com/github).

Tu URL es desplegada en cada punto del mundo, todos tus archivos estáticos están en caché, comprimidos con los mejores códecs (como [Brotli](https://medium.com/oyotech/how-brotli-compression-gave-us-37-latency-improvement-14d41e50fee4), que está construido dentro de Verceel), y optimizado para cada métrica de rendimiento en front-end por la que te quieras preocupar.

## Cómo Desplegar

Después de haber creado tu cuenta en Vercel, necesitamos instalar el Vercel CLI.

```bash
yarn global add vercel
```

Esto nos permite ejecutar `vercel` o `vc` para enlazar a nuestro proyecto y desplegar. Vamos a hacer esto ahora y desplegar nuestra aplicación create-next-app.

```bash
➜  your-repo git:(master) vc
Vercel CLI 19.0.1
🔍  Inspect: https://vercel.com/user/project/4ojo34wgk [6s]
✅  Preview: https://project.user.now.sh [copied to clipboard] [38s]
📝  To deploy to production (yourdomain.com +1), run `vc --prod`
```

Ahora deberás ser capaz de visitar la URL de salida de la consola y ver tu proyecto desplegado en directo.

## Integración con GitHub

La integración de Vercel con GitHub te permite subir el código a tu repo y desplegar el proyecto automáticamente – sin ninguna configuración requerida.

![Integración Vercel GitHub](/vercel-github.png)

Después de [instalar la aplicación de GitHub](https://vercel.com/github), lo que tendrás será:

- **Una URL para cada PR** – Cada _pull request_ obtiene una URL fija de despliegue que permanece actualizada con los cambios. Compártela una vez con tu equipo y permíteles seguir en directo los cambios sin preguntar de nuevo por las URLs.
- **Una URL para cada Commit** – Cada commit recibe su propia URL. ¿Necesita testear rápidamente qué ha cambiado en un commit? Vercel para GitHub hace esto sencillo.

Las actualizaciones a la rama master son intantáneamente asignadas a tu nombre de dominio en producción, gracias al asignado de alias automático. Si cometes un error y necesitas revertirlo, simplemente haz _push_ de un commit revirtiendo los cambios y se realizará una reversión instantánea. Tu sitio volverá al estado anterior antes de que puedas refrescar el navegador para verificarlo.

## Inicio Rápido desde una Plantilla

Si prefieres no utilizar la línea de comandos, puedes comenzar desde la [plantilla de Next.js](https://vercel.com/import/nextjs). Esto:

- Creará un nuevo repositorio conectado a tu GitHub
- Creará un nuevo proyecto dentro de Vercel
- Desplegará tu plantilla a producción

[![Despliegue Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/vercel/vercel/tree/master/examples/nextjs)
