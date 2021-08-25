# Next.js

![Next.js Trend](https://leerob.io/static/images/learn-nextjs/nextjs-trend.png)

You've heard great things about this new web framework called [Next.js](https://nextjs.org/),
but you're still not sure _why_ people are using it.

One way to understand why you should learn Next.js is to understand what problems it solves. This directly translates to why it's become so popular.

### Why use a framework?

Let's say you're a new startup trying to launch a website. You might have some requirements like:

- Splash page with information about the product
- About page describing the team
- Frequently asked questions
- Capture leads through a contact form
- Subscribe to a newsletter

There's nothing in these requirements which dictate the need for a framework.
You could absolutely deliver on these requirements using vanilla HTML, CSS, and JavaScript.

However, if we have some foresight, we might know that future requirements call for a user authentication flow and the beginnings of a SaaS product.

**The real value in using a framework** is developer productivity, shared knowledge, code reuse, and creating a platform for the future.
If we start with React/Next.js, we can satisfy the initial requirements with ease _and_ pave the way for the next iteration of the product.

### React

[React](https://reactjs.org/) has become the industry standard for building modern web applications.
Of 90,000 developers [surveyed by Stack Overflow](https://insights.stackoverflow.com/survey/2019), React was the most loved and most wanted web framework.

Why? With React, you can build anything from simple marketing splash pages to full-fledged web applications on the scale of Facebook.
It's flexible and composable. Developers love this.

![React.js Trend](https://leerob.io/static/images/learn-nextjs/react-trend.png)

This trend means that more developers than ever are learning React, and thus JavaScript as well.
It's become one of the hottest skills recruiters are looking for. JavaScript is the [#1 language used](https://octoverse.github.com/) according to GitHub.

[![GitHub Octoberse](https://leerob.io/static/images/learn-nextjs/github.png)](https://octoverse.github.com/)

For companies, this means you're more likely to find employees who already know React.
For developers, this makes a very advantageous skill to add to your skillset.

According to [NPM trends](https://www.npmtrends.com/), it's outpacing other web frameworks like Angular and Vue by **~5 million installs/day**.

![NPM Install Trend](https://leerob.io/static/images/learn-nextjs/npm-trend.png)

This doesn't mean React is perfect. Since you're loading content client-side, you have to
wait for the JavaScript bundle to load before you can determine what to show on the page. This can be problematic for users
with slower connections.

Plus, search engines still struggle with indexing client-side JavaScript applications.
If you're concerned about Search Engine Optimization (SEO) and want your content indexed faster, it's better to send the markup from the server.
Enter Next.js.

### Next.js

[Next.js](https://nextjs.org/) solves both of those problems using server-rendering or static-site generation. Next's framework allows you to build scalable, performant React code without the configuration hassle.
That's why so many companies depend on Next for shipping production applications.

![Companies using Next.js](https://leerob.io/static/images/learn-nextjs/companies.png)

- 350k+ Next.js devs (30% of all React devs)
- 60+ Alexa top 10k sites built using Next.js
- Over 35,000 production sites
- 300k weekly NPM downloads
- Used by companies like Nike, Uber, Hulu, Twitch, and GitHub

### Zero-Config Approach

To ship a performant React application, there are many things you must do right.
You'll want to correctly configure [Babel](https://babeljs.io/) so you can use modern JavaScript features, but still support legacy browsers.
You'll also want to bundle up all of your assets (e.g. multiple JavaScript files) to be included in your HTML file (using something like [Webpack](https://webpack.js.org/)). The list goes on.

Wouldn't it be nice to not have to worry about this?

This "JavaScript fatigue" prompted the creation of [Create React App](https://github.com/facebook/create-react-app) (CRA), which dramatically improved the developer experience of spinning up a new React app. But can we do better?

- Next.js supports IE10 and all modern browsers out of the box. Babel is configured for you, with an escape hatch to override if you need to.
- CRA combines all the JavaScript files into a single bundle, whereas Next.js has support for code splitting out of the box. When I visit `/route`, we're **only loading the JavaScript used on that page**. Better performance!
- Want to handle routing with CRA? That will require [react-router](https://reacttraining.com/react-router/) (or a similar library). Next.js has file-system based routing out of the box. No extra installation!

### Hybrid Approach

Next is unique among front-end and JAMstack frameworks because it seamlessly allows developers to grow from static sites to server-rendered sites as requirements change. No matter what [data fetching](/fundamentals/data-fetching) strategy you need, you can stay within the bounds of the framework.

- **Static Sites** – Blazing-fast JAMstack websites.
- **Server Side Rendering** – Great for SEO and load performance.
- **Pre-Rendering** – Best of both worlds. Blazing-fast website + scale traffic effortlessly.
