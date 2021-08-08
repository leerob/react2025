# Importaciones Absolutas

Como has podido notar, hemos empezado a crear una serie de directorios a alto nivel como `components` y `util`. A medida que la aplicación crece, lo hará también el tamaño de las declaraciones de importaciones o _imports_. Para evitar acaba con un _spaghetti_ como `../../../../`, podemos utilizar [importaciones absolutas y alias](https://nextjs.org/docs/advanced-features/module-path-aliases).

```js
🚫 import { getAllSites } from '../../../lib/db-admin';
✅ import { getAllSites } from '@/lib/db-admin';
```

Next.js 9.4 hace super simple la configuración de importaciones absolutas tanto para proyectos de JavaScript como de TypeScript. Todo lo que necesitas hacer es añadir el campo de configuración `baseUrl` a `jsconfig.json` (para proyectos de JS) o a `tsconfig.json` (para proyectos de TS).

Esto nos permitirá realizar importaciones absolutas desde `.` (el directorio raíz). También se integra con VSCode y otros editores, soportando la navegación por el código y otras funcionalidadesw de los editores.

Además, Next.js 9.4 también soporta las opciones de `paths`, las cuales nos permiten crear alias personalizados. Vamos a configurar esto para nuestra aplicación.

**`jsconfig.json`**

```js
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["components/*"],
      "@/lib/*": ["lib/*"],
      "@/styles/*": ["styles/*"],
      "@/utils/*": ["utils/*"]
    }
  }
}
```

Aprovecha esto para actualizar todos los _paths_ y rutas para utilizar esta nueva sintaxis. En el futuro, todos los fragmentos de código utilizarán este nuevo estilo.

import Callout from 'nextra-theme-docs/callout'

<Callout>
Puedes buscar y reemplazar en VSCode para simplificar este proceso.
</Callout>

[VSCode Documentation](https://code.visualstudio.com/docs/editor/codebasics#_find-and-replace)
