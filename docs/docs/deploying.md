---
title: Deploying with Vercel
---

[Vercel](http://vercel.com/) an all-in-one platform with Global CDN supporting static & JAMstack deployment and serverless functions. It's made by the creators of Next.js and has first-class support for Next.js applications. When you deploy your Next.js app to Vercel, the following happens by default:

- Pages that use Static Generation and assets (JS, CSS, images, fonts, etc) will automatically be served from the [Vercel Edge Network](https://vercel.com/edge-network), which is blazingly fast.
- Pages that use server-rendering and API routes will automatically become isolated [serverless functions](https://vercel.com/docs/v2/serverless-functions/introduction). This allows page rendering and API requests to scale infinitely.

**Vercel is like AWS for front-end developers.** It also have support for:

- **Custom Domains:** Once deployed on Vercel, you can assign a [custom domain](https://vercel.com/docs/v2/custom-domains) to your Next.js app.
- **Environment Variables:** You can also set [environment variables](https://zeit.co/docs/v2/build-step#environment-variables) on Vercel. You can then [use those environment variables](https://nextjs.org/docs/api-reference/next.config.js/environment-variables) in your Next.js app.
- **Automatic HTTPS:** HTTPS is enabled by default (including custom domains) and doesn't require extra configuration. They also auto-renew SSL certificates.

Vercel made a huge breakthrough with the realization that the preview deploy URL was a superior abstraction for frontend teams. They created a workflow for deploying / reviewing code in real-time — similar to a preview in a CMS, but by [integrating into Git and deploying with every push](https://vercel.com/github).

Your URL gets deployed to every edge in the world, all your static assets get cached, compressed with the greatest codecs (like [Brotli](https://medium.com/oyotech/how-brotli-compression-gave-us-37-latency-improvement-14d41e50fee4), which is built into Vercel out of the box), and optimized for every frontend performance metric you could care about.

## How to Deploy

After you've created an account on Vercel, we need to install the Vercel CLI.

```bash
yarn global add vercel
```

This allows you to run `vercel` or `vc` to link your project and deploy. Let's do that now and deploy our create-next-app application.

```bash
TODO
```

You should now be able to visit the URL from the console output and see your site deployed live.
