---
title: Product Overview
---

## Database Schema

**User**

| Name        |   Type   |                 Description |
| :---------- | :------: | --------------------------: |
| `createdAt` | `String` |               ISO Timestamp |
| `email`     | `String` |     Email from social login |
| `name`      | `String` |      Name from social login |
| `photoUrl`  | `String` |    Avatar from social login |
| `plan`      | `String` |    (Free, Starter, Premium) |
| `provider`  | `String` | Which social login was used |
| `uid`       | `String` |      UID from Firebase Auth |

**Feedback**

| Name        |   Type   |                  Description |
| :---------- | :------: | ---------------------------: |
| `author`    | `String` |       Name from social login |
| `authorId`  | `String` |       UID from Firebase Auth |
| `createdAt` | `String` |                ISO Timestamp |
| `provider`  | `String` |  Which social login was used |
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
