# Next.js

![Tendencia Next.js](https://leerob.io/static/images/learn-nextjs/nextjs-trend.png)

Habrás escuchado grandes cosas acerca de este nuevo _framework_ llamado [Next.js](https://nextjs.org/), pero todavía no estás seguro de _por qué_ las personas los están usando.

Una forma de entender por qué deberías aprender Next.js es entendiendo los problemas que resuleve. Esto se traduce directamente en por qué es tan popular.

### ¿Por qué utilizar un framework?

Digamos que eres una nueva startup tratando de construir un sitio web. Tendrás algunos requerimientos como:

- Página con la información sobre el producto
- Página "Acerca de" describiendo al equipo
- Preguntadas frecuentes
- Capturar _leads_ a través de un formulario de contacto
- Suscribirse a una newsletter

No existe nada en estos requisitos que dicten que se necesita un framework. Puedes realizar estos requisitos utilizando _vanilla_ HTML, CSS y JavaScript.

Si embargo, si tenemos algo de previsión, quizás sabremos que los futuros requisitos pueden llevar a funcionalidades como un flujo de autenticación de usuarios y los inicios de un producto SaaS.

**El valor real de utilizar un framework** es la productividad del desarrollador, el conocimiento compartido, la reutilización de código y la creación de una plataforma para el futuro.
Si empezamos con React/Next.js, podemos satisifacer estos requerimientos iniciales con facilidad y pavimentar el camino para la siguiente iteración de nuestro producto.

### React

[React](https://reactjs.org/) se ha convertido en un estándar de la industria para construir aplicaciones web modernas.
Entre los 90.000 desarrolladores [encuestados por Stack Overflow](https://insights.stackoverflow.com/survey/2019), React fue el más querido y más solicitado entre los frameworks.

¿Por qué? Con React, puedes construir cualquier cosa, desde una simple página de marketing a aplicaciones web completas de la escala de Facebook.
Es flexible y componible. A los desarrolladores les encanta esto.

![Tendencia React.js](https://leerob.io/static/images/learn-nextjs/react-trend.png)

Esta tendencia significa que más desarrolladores más que nunca están aprendiendo React, y con ello también JavaScript.
Se ha convertido en una de las habilidades que más buscan los reclutadores. JavaScript es el [#1 lenguaje utilizado](https://octoverse.github.com/) de acuerdo a GitHub.

[![GitHub Octoberse](https://leerob.io/static/images/learn-nextjs/github.png)](https://octoverse.github.com/)

Para las empresas, esto significa que es más probable que encuentren empleados que ya conocen React.
Para los desarrolladores, esto hace que sea una habilidad muy ventajosa para agregar a tu conjunto de habilidades.

De acuerdo con las [tendencias de NPM](https://www.npmtrends.com/), React está superando a otros frameworks web como Angular y Vue por **~5 millones de instalaciones/día**.

![Tendencias Instalaciones NPM](https://leerob.io/static/images/learn-nextjs/npm-trend.png)

Esto no significa que React sea perfecto. Ya que estás cargando contenido en el lado del cliente, debes esperar a que el paquete o _bundle_ de JavaScript cargue antes de determinar qué mostrar en la página. Esto puede ser problemático para usuarios con conexiones más lentas.

Además, los buscadores encontrarán problemas con indexar aplicaciones de JavaScript en el lado del cliente. Si te preocupa la optimización en buscadores o _Search Engine Optimization_ (SEO) y quieres que tu contenido se indexe más rápido, es mejor enviar el contenido desde el servidor. Entramos en Next.js.

### Next.js

[Next.js](https://nextjs.org/) solventa estos problemas utilizando renderizador en el lado del servidor o generación estática de sitios. El framework de Next.js te permite construir código en React escalable y que rinde a la perfección sin la molestia de configurar todo.
Este es el motivo por el que muchas compañías dependen de Next.js para desplegar aplicaciones en producción.

![Companies using Next.js](https://leerob.io/static/images/learn-nextjs/companies.png)

- 350k+ desarroladores de Next.js (30% de todos los desarrolladores de React)
- 60+ Top 10k sitios de Alexa están construidos usando Next.js
- Alrededor de 35.000 sitios en producción
- 300k descargas semanales en NPM
- Utilizado por compañías como Nike, Uber, Hulu, Twitch and GitHub

### Enfoque de Cero Configuración

Para enviar una aplicación de React eficaz, existen una serie de cosas que tienes que hacer bien.
Querrás configurar correctamente [Babel](https://babeljs.io/) de forma que puedas utilizar funcionalidades de JavaScript moderno, pero al mismo tiempo ofrecer soporte a navegadores antiguos.
También querrás empaquetar todos tus ficheros o _assets_ (por ejemplo, múltiples ficheros de JavaScript) para ser incluidos en tu fichero HTML (utilizando algo como [Webpack](https://webpack.js.org/)). Y la lista de tareas continúa.

¿No sería bonito no tener que preocuparse por todo esto?

Esta "fatiga de JavaScript" promovió la creación de [Create React App](https://github.com/facebook/create-react-app) (CRA), que mejoró dramáticamente la experiencia del desarrollador para crear una nueva app en React. Pero, ¿qué podemos hacer mejor?

- Next.js soporta IE10 y todos los navegadores modernos por defecto. Babel es configurado para ti, pero con una trampilla de escape para sobreescribirlo si lo necesitas.
- CRA combina todos los ficheros de JavaScript en un único paquete, mientras que Next.js tiene soporte para separación del código o _code splitting_. Cuado visito `/route`, **solo estamos cargando el JavaScript que se usa en esa página**. ¡Mucho mejor rendimiento!
- ¿Quieres manejar las rutas con CRA? Esto requerirá [react-router](https://reacttraining.com/react-router/) (o una librería similar). Next.js tiene un enrutamiento basado en un sistema de archivo. ¡Sin instalación extra!

### Enfoque híbrido

Next es único entre los frameworks de front-end y JAMstack porque permite sin problemas a los desarrolladores crecer desde sitios estáticos a sitios rederizados en el lado del servidor a medida que los requerimientos cambian. No importa que estrategia de [data fetching](/fundamentals/data-fetching) necesites, puedes permanencer dentro de los límites del framework.

- **Sitios Estáticos** – Sitios web JAMstack ultrarápidos.
- **Renderizado en el Lado del Servidor** – Excelente para SEO y rendimiento de carga.
- **Pre-Renderizado** – Lo mejor de ambos mundos. Sitios web ultrarápidos + escalar el tráfico sin esfuerzos.
