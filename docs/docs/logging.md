---
title: Logging
---

Before we release our product, we want to think through worst-case scenarios.

- What happens if our API requests fail?
- What if users can't log in?
- How will I know my application is running succesfully?

### Observability

[Observability & monitoring](https://thenewstack.io/monitoring-and-observability-whats-the-difference-and-why-does-it-matter/) are two key pillars of understanding your system. In the world of SaaS, observability means you can answer any questions about what’s happening on the inside of the system just by observing from the outside. There's no need to ship new code.

Having a static site drastically reduces the amount of complexity in our deployment setup. However, we still have serverless functions in play, and rely on third-part solutions. There is still a chance things can go wrong. When they do, we'd like to be prepared to promptly solve the issue.

With an "observable system", we have the tools to understand what's happening in one query. Simple ask an abitrary question, and learn more about how our software is working.

### Adding Logging

Before we can query our data, we need to _have_ data. We want to log out relevant information for critical events in our system – a live stream of events.

There are many ways to add logging to SaaS applications, each with their own tradeoffs. For this course, I'll focus on a solution that will allow you to plug-and-play the provider of your choice. Then, I'll recommend my favorite solution for the opinionated stack.

With most logging providers, anything you `console.log` will show up. For example, your basic log might look something like this.

```js
console.log('Completed successfully!');
console.error('500: Request failed.');
```

You can also have structured logs through JSON objects. Certain logging providers will parse the object and provide you access to query individual fields. For example, with Node.js you might use [Pino](http://getpino.io/).

```js
import logger from 'pino';

logger.info({
  user: {
    name: 'Lee Robinson',
    email: 'me@leerob.io',
    id: 'hlk436k4l26h2'
  },
  event: {
    type: 'request',
    tag: 'api'
  }
});
```

Which then gives you a structured object like this.

```json
{
  "level": 30,
  "time": 1531171082399,
  "pid": 657,
  "hostname": "169.254.69.141",
  "user": {
    "name": "Lee Robinson",
    "email": "me@leerob.io",
    "id": "hlk436k4l26h2"
  },
  "event": {
    "type": "request",
    "tag": "api"
  }
}
```

### Logflare

[Logflare](https://logflare.app/) is my favorite way to handle logs for applications deployed to Vercel. With their [Vercel Integration](https://vercel.com/integrations/logflare), it makes it simple to go from `console.log` to structured logs you can query. Their free tier is very generous (5,200,000 event logs per month) and they've graciously offered a discount of React 2025 members.

Logflare automatically parses information from your serverless functions to you can see how long your requests take. With normal application logs, you don't get any information about what's cached. With Logflare + Vercel, you do and it's structure and queryable. Another huge advantage of Logflare is that it's backed by BigQuery. It's significantly cheaper than other SaaS logging products out there and allows you to "bring your own backend" if you want. No vendor lock-in!

### Setting up the Vercel Integration

TODO https://logflare.app/guides/vercel-setup
https://www.notion.so/The-Ultimate-Guide-to-Logging-for-Next-js-and-Vercel-fe957f3adf1e4fcc9a426861b6e39075

### Adding Logs with Pino

TODO

```bash
yarn add pino
```
