# Analytics

It's impossible to measure your success if you can't track it. Whatever your metric is (post views, number of likes), you need a baseline to improve upon. This section will cover setting up analytics and goals to track the metrics you care about.

## Which platform?

Google Analytics is, by far, the most popular analytics platform. That doesn't mean you need to use it. While it's free tier is enticing, there is no such thing as "free" software. It's made available for free because of all the data you're providing. Since Fast Feedback values the privacy of our customers, we're going to [opt out](https://usefathom.com/blog/google-analytics-seo) of using Google Analytics.

I prefer to use [Fathom Analytics](https://usefathom.com/ref/T93GOJ). Since we don't need to load, show, or store cookie notices, we can remove all the extra JavaScript slowing down page load times. Faster load times equate to better Google rankings. Plus, if you need to be GDPR, PECR or CCPA compliant, Fathom will make your life easier.

## Adding Fathom Analytics

Fathom Analytics works well with Next.js with minimal configuration. First, let's install the client.

```bash
$ yarn add fathom-client
```

Then, we can update `_app.js` to initialize Fathom with your Site ID. This code will only track analytics with a production build (e.g. `next build && next start`).

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
If your project is open source, you might want to move your Fathom site ID to an environment variable.
</Callout>

## Tracking Goals

Now that we can track page views, let's also track specific goals. For example, we might want to see the conversion rate of users on the landing page clicking "Sign up". Having this baseline will allow us to make changes to the design and see if conversation rates increase or decrease.

Fathom has [great documentation](https://usefathom.com/support/goals) on setting goals. The specific example we'll look at will be `onClick` of a button. First, create a utility for tracking goals.

**`lib/analytics.js`**

```js
export const trackGoal = (id) => {
  window.fathom.trackGoal(id, 0);
};
```

Then, call `trackGoal` when the button is clicked.

**`pages/index.js`**

```js
<Button onClick={() => trackGoal('B5PGZD9N')}>Sign Up</Button>
```

## Open-Source Alternatives

If you don't want to use Fathom, here are some open-source alternatives.

- [Matomo](https://matomo.org/)
- [Offen](https://www.offen.dev/)
- [Ackee](https://ackee.electerious.com/)

[Here's an example](https://github.com/tobimori/www/commit/b929fb3de83f2938c7473d6b1be1842954938e20) using Ackee with Next.js.
[Thanks, Tobias!](https://github.com/tobimori)
