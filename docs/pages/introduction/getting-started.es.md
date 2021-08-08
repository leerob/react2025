# Empezando

¡Vamos a empezar a construir nuestra aplicación!
Si no has utilizado Next.js antes, quizás necesitas actualizar tu versión de Node.js.

### Requerimientos del Sistema

- [Node.js 10.13](https://nodejs.org/en/) o más reciente
- MacOS, Windows (incluyendo WSL) y Linux son soportados

### Editor

[VSCode](https://code.visualstudio.com/) es mi editor preferido. El tema que utilizo se llama "Sorcerer" y puedes encontrar una lista de todas mis extensiones [aquí](https://github.com/leerob/fastfeedback/blob/master/.vscode/extensions.json).

### Crear la Aplicación

En este curso usaré `yarn` en lugar de `npm`. Eres libre de usar cualquiera que prefieras.

```bash
yarn create next-app
```

Esto crea nuestra nueva aplicación de Next.js e instala `next`, `react` y `react-dom`.
Dentro de nuestro `package.json`, ahora tenemos acceso a iniciar la aplicación.

- `dev` - Ejecuta `next` que inicia Next.js en modo de desarrollo.
- `build` - Ejecuta `next build` que compila la aplicación para su uso en producción.
- `start` - Ejecuta `next start` que inicia Next.js en un servidor de producción.

Ejecuta `yarn dev` para ver la aplicación en `http://localhost:3000`.

Si no quieres programar, también puedes ver el [código fuente completo](https://github.com/leerob/fastfeedback).
