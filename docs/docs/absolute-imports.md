---
title: Absolute Imports and Aliases
---

As you've noticed, we've started to build out a few top-level directories like `components` and `util`. As this application grows, so will the size of the import statements. To prevent the `../../../../` spaghetti, we can use [absolute imports and aliases](https://nextjs.org/docs/advanced-features/module-path-aliases).

```js
🚫 import { getAllSites } from '../../../util/db-admin';
✅ import { getAllSites } from '@/util/db-admin';
```

Next.js 9.4 makes setting up absolute imports super simple for both JavaScript and TypeScript projects. All you need to do is to add the `baseUrl` config to `jsconfig.json` (JS projects) or `tsconfig.json` (TS projects).

This will allow absolute imports from `.` (the root directory). It also integrates with VSCode and other editors, supporting code navigation and other editor features.

Furthermore, Next.js 9.4 also supports the `paths` option, which allows you to create custom module aliases. Let's set this up for our application.

**`jsconfig.json`**

```js
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["components/*"],
      "@/util/*": ["util/*"],
      "@/styles/*": ["styles/*"]
    }
  }
}
```

Take this opportunity to go back and update all paths to use the new syntax. Going forward, all code snippets will use this new style.

:::tip

You can [find & replace](https://code.visualstudio.com/docs/editor/codebasics) in VSCode to simplify this.

:::
