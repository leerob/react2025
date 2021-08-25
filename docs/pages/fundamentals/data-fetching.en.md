# Data Fetching

The [Jamstack](https://jamstack.org/) (*J*avaScript, *A*PIs, and *M*arkup) was built on [static-site generators](https://www.staticgen.com/). These frameworks provided a singular way to fetch data––at build-time––and serve pages to users. But not all pages are created equal. As applications scaled, it became clear that the frameworks needed to evolve.

Jamstack frameworks of the future allow changing your data-fetching strategy on a per-page basis. Your landing page is generated at build time, while your dashboard is rendered client-side. This
flexibility allows your application to scale as requirements change, *without* needing to switch frameworks.

For example, [Vercel's site](https://vercel.com/) uses two different data-fetching strategies.

- **Static Generation** –– Generate static marketing pages, blog posts, and documentation at build time.
- **Client-Side** –– Serve a static shell, then fetch user information for the dashboard at request time.

With [Next.js](https://nextjs.org/), you can change your data fetching strategy on a [per-page basis](https://nextjs.org/docs/basic-features/pages). This section explains when to use each strategy as your application evolves.

- [Static Generation](#static-generation)
- [Incremental Static Regeneration (Beta)](#incremental-static-regeneration)
- [Client-Side Fetching (SWR)](#client-side-fetching-swr)
- [Server-Side Rendering (SSR)](#server-side-rendering-ssr)

## Static Generation

Static sites are the base of Jamstack, generating HTML at build-time and reusing it on each request. Static generation has several benefits.

- **Cheaper** –– Not making requests to the server on-demand.
- **Faster** –– Served from a global CDN close to your users.
- **Easier** –– No complicated deployments. Better developer experience.

Your page is built once and served by a [CDN](https://vercel.com/edge-network), making it faster than rendering on every request. By default, Next.js [pre-renders](https://nextjs.org/docs/basic-features/pages#pre-rendering) pages that do not fetch data. For example, `pages/products.js` is converted to `products.html` after running `next build`.

```js
function Products() {
  return <h1>Products</h1>
}

export default Products
```

You can also use static generation with external data sources. Your data is transformed into HTML at build-time using two Next.js functions.

- `getStaticProps` –– The content for your page.
- `getStaticPaths` –– The routes you want to generate.

### getStaticProps

Let's consider an e-commerce site showing a list of all products. At build-time, we want to fetch all products from our CMS and forward the information to the `Products` component.

```js
function Products({ products }) {
  return (
    <>
      <h1>Products</h1> 
      <ul>
        {products.map((product) => (
          <li key={product.id} {...product} />
        ))}
      </ul>
    </>
  )
}

 export async function getStaticProps() {
  return {
    props: {
      products: await getProductsFromCMS(),
    },
  }
}

export default Products
```

`getStaticProps` is [not included](https://nextjs.org/docs/basic-features/data-fetching#technical-details) in the client-side JavaScript bundle, so you can query your database directly if necessary. In addition to the pre-rendered HTML, Next.js generates a [JSON file](https://nextjs.org/docs/basic-features/data-fetching#statically-generates-both-html-and-json) containing the products from `getStaticProps` for use on the client-side.

### getStaticPaths

Your e-commerce site also needs to generate a static page for each product. Using [dynamic routes](https://nextjs.org/docs/routing/dynamic-routes) and `getStaticPaths`, we can generate all the product paths at build time based on their `id`.

We also need the product data for each page. In combination with `getStaticProps`, we can fetch the specific product data for that `id`. If a product path is not found, `fallback: false` will show a 404.

```js
// pages/products/[id].js

function Product({ product }) {
  // Render product
}

 export async function getStaticProps() {
  return {
    props: {
      product: await getProductFromCMS(),
    },
  }
}

export async function getStaticPaths() {
  const products = await getProductsFromCMS()

  const paths = products.map((product) => ({
    params: { id: product.id },
  }))

  return { paths, fallback: false }
}

export default Product
```

## Incremental Static Regeneration

Your e-commerce platform has grown significantly. Instead of 100 products, you now have 100,000. Products change frequently. We can't have a full site rebuild every time a product is modified.

[Incremental Static Regeneration](https://github.com/zeit/next.js/discussions/11552) allows you to keep [the benefits of static](https://rauchg.com/2020/2019-in-review#static-is-the-new-dynamic) (always fast, always online, globally distributed) with dynamic data. To demonstrate, here's our product list with regeneration.

- A static page with a list of all products is generated at build time.
- When a request comes in, the static page is served.
- The page is re-rendered in the background after one minute to retrieve the latest products.
- After the page is generated, the updated product list is shown.

```js
 export async function getStaticProps() {
  return {
    products: await getProductsFromCMS(),
    revalidate: 60,
  }
}
```

Inspired by [stale-while-revalidate](https://tools.ietf.org/html/rfc5861), this ensures traffic is served statically, and new pages are pushed only after generating successfully. Incremental Static Regeneration is fully supported by both `next start` and the [Vercel edge platform](https://vercel.com/) out of the box. [Here's an example](https://static-tweet.now.sh/) of regeneration on the scale on 500M new pages a day.

## Client-Side Fetching (SWR)

As previously mentioned, client-side fetching works well for frequently updated pages like dashboards. Since these pages are private and user-specific, SEO is not as important. Instead, we can optimize for performance.

- Pre-render the page without data and show a loading state.
- Then, fetch and display the data client-side.

I recommend using [SWR](https://swr.now.sh/) to fetch data client-side securely. It handles caching, revalidation, focus tracking, and more. For our e-commerce application, one example would be the shopping cart.

```js
import useSWR from 'swr'

function ShoppingCart() {
  const { data, error } = useSWR('/api/cart', fetch)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>Items in Cart: {data.products.length}</div>
}
```

### APIs

Fetching data is only half the equation. After reading, you'll need to write back to your data source. For example, let's add an item to the shopping cart.

With Next.js, all we need is a new route inside the `pages/api` directory. This file creates a [serverless function](https://nextjs.org/blog/next-9#api-routes) we can use to mutate our data source. For example, `pages/api/cart.js` accepts a `productId` query parameter and adds that item to our cart.

Inside our [API route](https://nextjs.org/docs/api-routes/introduction), we export a request handler, which receives a request and returns a `json` response.

```js
export default async (req, res) => {
  const response = await fetch(`https://.../cart`, {
    body: JSON.stringify({
      productId: req.query.productId,
    }),
    headers: {
      Authorization: `Token ${process.env.YOUR_API_KEY}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  const { products } = await response.json()
  return res.status(200).json({ products })
}
```

API routes allow us to access external APIs securely. Using [environment variables](https://nextjs.org/docs/basic-features/environment-variables), we can include secrets for authentication without exposing the values client-side.

## Server-Side Rendering (SSR)

Serving new HTML on every request is becoming less necessary with improvements to static generation. For pages that don't change frequently, `getStaticProps` / `getStaticPaths` can be ran at build-time. For more dynamic content, Incremental Static Regeneration can build new pages at request-time. Where does that leave [SSR](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering) with `getServerSideProps`?

You'll often see server rendering mentioned when discussing Search Engine Optimization (SEO). This architecture does provide better SEO than client-side rendering (CSR), but with worse performance than static generation. With server rendering, the [Time to First Byte (TTFB)](https://nextjs.org/docs/advanced-features/measuring-performance#web-vitals) is slower than `getStaticProps` because the server must compute the result on every request. Without extra configuration, the result cannot be cached by a CDN.

Server rendering is not disappearing [but evolving](https://rauchg.com/2020/2019-in-review#static-is-the-new-dynamic). With static regeneration, the first request hits the server to build static HTML, and all subsequent requests can be cached.

## Conclusion

The hybrid approach of Next.js allows changing your data-fetching strategy on a per-page basis.

- Use static generation for most use cases.
- Use client-side rendering with SWR if your data changes frequently.
- Mutate data using API routes.

For more information, see the Next.js documentation.

- [Pre-Rendering](https://nextjs.org/docs/basic-features/pages#pre-rendering)
- [Data Fetching](https://nextjs.org/docs/basic-features/data-fetching)
- [API Routes](https://nextjs.org/docs/api-routes/introduction)
