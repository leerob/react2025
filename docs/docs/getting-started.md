---
title: Getting Started
---

### System Requirements

- [Node.js 10.13](https://nodejs.org/en/) or later
- MacOS, Windows (including WSL), and Linux are supported

### Create Application

```bash
npm init next-app
# or
yarn create next-app
```

This creates our new Next.js application and installs `next`, `react` and `react-dom`.
Inside our `package.json`, we now have access to start the application.

- `dev` - Runs `next` which starts Next.js in development mode.
- `build` - Runs `next build` which builds the application for production usage.
- `start` - Runs `next start` which starts a Next.js production server.

Run `npm run dev` to view the application at http://localhost:3000.

### Next.js Features

- Automatic compilation and bundling (with Webpack and Babel)
- React Fast Refresh
- Static generation and server-side rendering of `./pages/`
- Static file serving. `./public/` is mapped to`/`