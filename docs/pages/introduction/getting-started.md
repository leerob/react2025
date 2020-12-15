# Getting Started

Let's get started building our application!
If you haven't used Next.js before, you might need to update your version of Node.js.

### System Requirements

- [Node.js 10.13](https://nodejs.org/en/) or later
- MacOS, Windows (including WSL), and Linux are supported

### Editor

[VSCode](https://code.visualstudio.com/) is my preferred editor. The theme I use is called "Sorcerer"
and you can find a list of all my extensions [here](https://github.com/leerob/fastfeedback/blob/master/.vscode/extensions.json).

### Create Application

In this course, I will use `yarn` instead of `npm`. You are free to use whichever you prefer.

```bash
yarn create next-app
```

This creates our new Next.js application and installs `next`, `react` and `react-dom`.
Inside our `package.json`, we now have access to start the application.

- `dev` - Runs `next` which starts Next.js in development mode.
- `build` - Runs `next build` which builds the application for production usage.
- `start` - Runs `next start` which starts a Next.js production server.

Run `yarn dev` to view the application at `http://localhost:3000`.

If you don't want to code along, you can also view the [completed source code](https://github.com/leerob/fastfeedback).
