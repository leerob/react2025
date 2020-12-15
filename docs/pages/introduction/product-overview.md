# Product Overview

In this course, we'll build [Fast Feedback](https://fastfeedback.io) – the easiest way to add reviews and comments to your static site.

When brainstorming product ideas for the course, I needed something I'd enjoy creating. Plus, it needed to be complex enough to handle user authentication, database storage, and payments. After iterating on a few thoughts, the idea for [Fast Feedback](https://fastfeedback.io) came to me.

![Review](/review.png)

Blogs are an essential part of the internet. They're an open dialogue between the author and their audience. However, it's increasingly becoming one-way communication. Adding comments to your blog is difficult, especially with the rise of static-site generators like Next.js and Gatsby.

Most people using these frameworks _want_ comments, but they don't want the overhead of building the commenting system themselves. To add comments, you need to consider:

- Do I want to allow _anyone_ to comment? Should people log in?
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
  src="https://fastfeedback.io/embed/7QUdWsz58EDnHsdub7UW/EAXJmnnTL1f6CUGeZrNI"
/>
```

Let's break this URL down.

- `https://fastfeedback.io/embed/${SITE_ID}` - This route displays all feedback for the given site. Feedback is presented with a clean, minimal design including a link to login and leave feedback.
- `/${ROUTE_ID}` - This optional path allows you to track which route the feedback is for. This allows you to use the same `SITE_ID` for a blog for example.

We're able to use **no JavaScript** by serving a static site through the `iframe`. You might be wondering – how does the feedback get updated then? Using Next.js and [Incremental Static Regeneration](https://nextjs.org/blog/next-9-4#incremental-static-regeneration-beta), we can periodically regenerate the static page to show all comments that have been approved.

## Database Schema

**User**

| Name         |   Type   |                  Description |
| :----------- | :------: | ---------------------------: |
| `uid`        | `String` |       UID from Firebase Auth |
| `email`      | `String` |      Email from social login |
| `name`       | `String` |       Name from social login |
| `photoUrl`   | `String` |     Avatar from social login |
| `provider`   | `String` |  Which social login was used |
| `stripeRole` | `String` |     (Free, Starter, Premium) |
| `stripeId`   | `String` | Linking customer with Stripe |
| `status`     | `String` | (Active, Suspended, Deleted) |

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
