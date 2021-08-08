# Analítica

Es imposible medir tu éxito si no puedes medirlo. Cualquiera que sea tu métrica (visitas a posts, número de likes), necesitas una línea base sobre la que mejorar. Esta sección cubrirá cómo configurar las analíticas y objetivos para ratrear las métricas que te importan.

## ¿Qué plataforma?

Google Analytics es, de lejos, la plataforma de analítica web más popular. Esto no significa que sea la que tengas que usar. Mientras que su plan gratuito es excitante, esto no significa que sea _software_ "gratis". Está hecho de forma gratuita debido a todos los datos que tú le estás proporcionando. Dado que Fast Feedback valora la privacidad de nuestro clientes, vamos a [optar por no utilizar](https://usefathom.com/blog/google-analytics-seo) Google Analytics.

Prefiero utilizar [Fathom Analytics](https://usefathom.com/ref/T93GOJ). Dado que no tenemos que cargar, mostrar o almacenar avisos de cookies, podemos eliminar todo el JavaScript extra que aumenta los tiempo de carga de página. Tiempos de carga más rápida significan mejores posiciones en los resultados de búsqueda de Google. Además, si necesitas cumplir con GDPR, PECR o CCPA, Fathom hará tu vida mucho más fácil.

## Añadiendo Fathom Analytics

Fathom Analytics funciona genial en Next.js con una mínima configuración. Primero, vamos a instalar el cliente.

```bash
$ yarn add fathom-client
```

Después, podemos actualizar `_app.js` para inicializar Fathom con el ID de nuestro sitio. Este código solo rastreará las estadísticas en producción (e.g. `next build && next start`).

**`_app.js`**

```js
import Router from 'next/router';
import * as Fathom from 'fathom-client';

Router.events.on('routeChangeComplete', () => {
  Fathom.trackPageview();
});

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      Fathom.load('YOUR_FATHOM_SITE_ID', {
        includedDomains: ['yourdomain.com']
      });
    }
  }, []);

  return (
    ...
  );
};
```

import Callout from 'nextra-theme-docs/callout'

<Callout>
Si tu proyecto es open source, quizás quieras mover el ID de sitio de Fathom a una variable de entorno.
</Callout>

## Midiendo objetivos

Ahora que podemos medir las visitas a página, vamos también a trackear un objetivo específico. Por ejemplo, puede que queramos ver el ratio de conversión de usuarios en la langing page donde hacen click en "Registro". Teniendo esta base podremos realizar cambios en el diseño si los ratios de conversión crecen o decrecen.

Fathom tiene una [gran documentación](https://usefathom.com/support/goals) para definir objetivos. El ejemplo específico al que miraremos será el de `onClick` en un botón. Primero, vamos a crear un útil para rastrear objetivos.

**`lib/analytics.js`**

```js
export const trackGoal = (id) => {
  window.fathom.trackGoal(id, 0);
};
```

Después, llamamos a `trackGoal` cuando el botón se haya clickado.

**`pages/index.js`**

```js
<Button onClick={() => trackGoal('B5PGZD9N')}>Sign Up</Button>
```

## Alternativas Open-Source

Si no quieres utilizar Fathom, aquí tienes algunas alternativas _open-source_.

- [Matomo](https://matomo.org/)
- [Offen](https://www.offen.dev/)
- [Ackee](https://ackee.electerious.com/)

[Aquí tienes un ejemplo](https://github.com/tobimori/www/commit/b929fb3de83f2938c7473d6b1be1842954938e20) utilizando Ackee con Next.js.
[¡Gracias, Tobias!](https://github.com/tobimori)
