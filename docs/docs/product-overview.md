---
title: Product Overview
---

In this course, we'll build [Fast Feedback](https://fastfeedback.io) – the easiest way to add reviews and comments to your static site.

![Fast Feedback](/img/fastfeedback.png)
![Review](/img/review.png)

When brainstorming product ideas for the course, I needed something I'd enjoy creating and shipping. Plus, it needed to be complex enough to handle user authentication, database storage, and payments. After iterating over a few ideas, the idea for Fast Feedback came to me.

Blogs are an essential part of the internet. They're an open dialouge between the author and their audience. However, it's increasingly becoming one-way communciation. Adding comments to your blog is difficult, especially with the rise of static-site generators like Next.js and Gatsby.

Most people using these frameworks _want_ comments, but they don't want the overhead of building the commenting system themselves. To add comments, you need to consider:

- Do I want to allow _anyone_ to comment? Should people login?
- What if people abuse the system? How can I moderate?
- Will this impact the privacy of my readers?
- Will this decrease the performance of my site?

Fast Feedback answers all those questions for you. With one line of code, you can add comments and reviews to your static site with **any framework** and **any language**.

- Prevent spam by making users log in with social accounts
- Authors have moderation tools to approve or reject comments.
- Works great for blogs, e-commerce sites, e-books, courses, etc.
- No tracking, no advertising. Just fast feedback from your users.
- No JavaScript necessary. One line to embed a static `iframe`.

## How does it work?

The main difference between Fast Feedback and others is that you can add feedback in **one line of code**.
For example, this would display comments for Fast Feedback itself.

```html
<iframe
  src="https://app.fastfeedback.io/embed/h3j5h2555hk2f?route=https%3A%2F%2Ffastfeedback.io"
/>
```

Let's break this URL down.

- `https://app.fastfeedback.io/embed/${SITE_ID}` - This route displays all feedback for the given `SITE_ID`. Feedback is presented with a clean, minimal design including a link to login and leave feedback. Paid users can customize styling of feedback.
- `?route=${URL_ENCODED_ROUTE}` - This query parameter allows you to track which route the feedback is for. This allows you to use the same `SITE_ID` for a blog for example.

We're able to use **no JavaScript** by serving a static site through the `iframe`. You might be wondering – how does the feedback get updated then? Using Next.js and [Incremental Static Regeneration](https://nextjs.org/blog/next-9-4#incremental-static-regeneration-beta), we can periodically regenerate the static page to show all comments that have been approved.

## Database Schema

**User**

| Name               |   Type   |                  Description |
| :----------------- | :------: | ---------------------------: |
| `createdAt`        | `String` |                ISO Timestamp |
| `email`            | `String` |      Email from social login |
| `name`             | `String` |       Name from social login |
| `photoUrl`         | `String` |     Avatar from social login |
| `plan`             | `String` |           (Starter, Premium) |
| `provider`         | `String` |  Which social login was used |
| `uid`              | `String` |       UID from Firebase Auth |
| `stripeCustomerId` | `String` | Linking customer with Stripe |
| `status`           | `String` | (Active, Suspended, Deleted) |

**Feedback**

| Name        |   Type   |                  Description |
| :---------- | :------: | ---------------------------: |
| `author`    | `String` |       Name from social login |
| `authorId`  | `String` |       UID from Firebase Auth |
| `createdAt` | `String` |                ISO Timestamp |
| `provider`  | `String` |  Which social login was used |
| `rating`    | `Number` |              Optional rating |
| `siteId`    | `String` |   Which site feedback is for |
| `status`    | `String` | (Pending, Approved, Removed) |
| `text`      | `String` |             Feedback content |

**Site**

| Name        |   Type   |                         Description |
| :---------- | :------: | ----------------------------------: |
| `authorId`  | `String` |              UID from Firebase Auth |
| `createdAt` | `String` |                       ISO Timestamp |
| `name`      | `String` |                        Name of site |
| `settings`  | `Object` | (Ratings, social logos, timestamps) |
| `url`       | `String` |                        Link to site |
