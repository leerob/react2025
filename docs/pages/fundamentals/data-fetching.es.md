# Obtención de Datos

El [Jamstack](https://jamstack.org/) (*J*avaScript, *A*PIs, and *M*arkup) fue construido sobre [generadores de sitios estáticos](https://www.staticgen.com/). Estos frameworks proporcionan una forma singular de traer datos --en el momento de compilar-- y servir páginas a los usuarios. Pero no todas las páginas son creadas igual. A medida que las aplicaciones escalan, quedó más claro que estos frameworks debían evolucionar.

Los frameworks Jamstack del futuro permiten cambiar tu estrategia de traer datos a tu app en función de la página. Tu landing page es generada en el momento de la compilación, mientras que tu _dashboard_ es renderizado en el lado del cliente. Esta flexibilidad permite a tu aplicación escalar a medida que los requerimientos cambian, *sin* la necesitad de cambiar frameworks.

Por ejemplo, [la web de Vercel](https://vercel.com/) utiliza dos estrategias diferentes de obtención de datos o _data-fetching_.

- **Generación estática** –– Genera páginas de marketing estáticas, publicaciones de blog y documentación en el momento de la compilación.
- **Lado del cliente** –– Sirve un marco o estructura estática, y luego trae la información del usuario al _dashboard_ en el momento de la petición.

Con [Next.js](https://nextjs.org/) puedes cambiar la estrategia de _data-fetching_ [por cada página](https://nextjs.org/docs/basic-features/pages). Esta sección explica cuando utilizar cada estrategia a medida que tu aplicación evoluciona.

- [Generación estática](#generación-estática)
- [Generación estática incremental (beta)](#regeneración-estática-incremental)
- [Obtención de datos en el lado del cliente (SWR)](#obtención-del-lado-del-cliente-swr)
- [Renderizado en el lado del servidor (SSR)](#renderizado-en-el-lado-del-servidor-ssr)

## Generación estática

Los sitios estáticos son la base del Jamstack, generando HTML en el momento de la compilación y reusándolo en cada petición. La Generación Estática tiene muchos beneficios.

- **Más barata** –– No realizando solicitudes al servidor a demanda.
- **Más rápida** –– Servida por una CDN global cercana a tus usuarios.
- **Más sencilla** –– Sin despligues complicados. Mejor experiencia para el desarrollador.

Tu página se compila una vez y es servida por una [CDN](https://vercel.com/edge-network), haciéndola más rápida que renderizando en cada petición. Por defecto, Next.js [pre-renderiza](https://nextjs.org/docs/basic-features/pages#pre-rendering) las páginas que no requieren datos. Por ejemplo, `pages/products.js` es convertida a `products.html` después de ejecutar `next build`.

```js
function Products() {
  return <h1>Products</h1>
}

export default Products
```

También puedes usar generación estática con fuentes de datos externas. Tus datos son trnasformados en HTML en el momento de la compilación utilizando dos funciones de Next.js.

- `getStaticProps` –– El contenido para tu página.
- `getStaticPaths` –– Las rutas que quieres generar.

### getStaticProps

Vamos a considerar un e-commerce que muestra una lista de todos los productos. En el momento de compilar, queremos traer todos los productos de nuestro CMS y redirigir la información al componente `Products`.

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

`getStaticProps` [no está incluido](https://nextjs.org/docs/basic-features/data-fetching#technical-details) en el paquete de JavaScript en el lado del cliente, por lo que puedes consultar tu base de datos directamente desde aquí si es necesario. En conjunción con el HTML pre-renderizado, Next.js genera un [fichero JSON](https://nextjs.org/docs/basic-features/data-fetching#statically-generates-both-html-and-json) que contiene los productos traídos en `getStaticProps` para utilizarlos en el lado del cliente.

### getStaticPaths

Tu sitio de e-commerce también necesita generar una página estática para cada producto. Utilizando las [rutas dinámicas](https://nextjs.org/docs/routing/dynamic-routes) y `getStaticPaths`, podemos generar todas las rutas de productos en el momento de la compilación basándonos en su `id`.

También necesitamos los datos del producto para cada página. En combinación con `getStaticProps`, podemos traer datos específicos del producto para ese `id`. Si la ruta de un producto no es encontrada, `fallback: false` mostrará un 404.

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

## Regeneración Estática Incremental

Tu e-commerce ha crecido de forma signiticativa. En lugar de 100 productos, ahora tiene 100.000. Los productos cambian frecuentemente. No podemos tener un sitio completo re-compilándose cada vez que un producto es modificado.

La Regeneración Estática Incremental o [Incremental Static Regeneration](https://github.com/zeit/next.js/discussions/11552) te permite mantener [los beneficios de la generación estática](https://rauchg.com/2020/2019-in-review#static-is-the-new-dynamic) (siempre rápido, siempre online, globalmente distribuido) pero con datos dinámicos. Para demonstrarlo, aquí está nuestra lista de productos con regeneración.

- Una página estática con una lista de todos los productos es generada en el momento de la compilación.
- Cuando una petición llega, la página estática es servida.
- La página es re-renderizada en el _background_ después de un minuto tras traer los últimos productos.
- Después de ser la página generada, se muestra la lista actualizada de productos.

```js
 export async function getStaticProps() {
  return {
    products: await getProductsFromCMS(),
    revalidate: 60,
  }
}
```

Inspirado por [stale-while-revalidate](https://tools.ietf.org/html/rfc5861), esto asegura que el tráfico es servido estáticamente y las nuevas páginas son enviadas solo después de que la generación haya sido existosa. La Regeneración Estática Incremental está totalmente soportada por `next start` y [Vercel edge platform](https://vercel.com/). [Aquí hay un ejemplo](https://static-tweet.now.sh/) de regeneración que escala a 500M de nuevas páginas cada día.

## Obtención del Lado del Cliente (SWR)

Como se ha mencionado previamente, la obtención del lado del cliente (_client-side fetching_) funciona bien para páginas que se actualizan de forma muy frecuente como _dashboards_. Ya que estas páginas son privadas y específicas para el usuario, el SEO no es un factor importante. En su lugar, aquí podemos optimizar para el rendimiento.

- Pre-renderizar la página sin datos y mostrar un estado de carga.
- Después, traer y mostrar los datos en el lado del cliente.

Recomiendo utilizar [SWR](https://swr.now.sh/) para traer los datos al lado del cliente de forma segura. SWR gestiona la chaché, revalidación, seguimiento del foco en página y mucho más. Para nuestra aplicación de e-commerce, un ejemplo podría ser el carrito de compra.

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

Traer datos es solo media parte de la ecuación. Después de leer, deberás volver a escribir en tu fuente de datos. Por ejemplo, vamos a añadir un nuevo ítem al carrito de compra.

Con Next.js, todo lo que necesitamos es una nueva ruta dentro del directorio `pages/api`. Este fichero crea una [función serverless](https://nextjs.org/blog/next-9#api-routes) que podemos utilizar para mutar o actualizar nuestra fuente de datos. Por ejemplo, `pages/api/cart.js` acepta un parámetro query llamado `productId` y añade el ítem a nuestro carrito de compra.

Dentro de nuestra [API route](https://nextjs.org/docs/api-routes/introduction), podemos exportar un manejador de la petición (_request handler_), el cual recibe una petición y retorna una respuesta en formato `json`.

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

API routes nos permiten acceder a APIs externas de forma segura. Utilizando [variables de entorno](https://nextjs.org/docs/basic-features/environment-variables), podemos incluir secretos para la autenticación sin exponer estos valores en el lado del cliente.

## Renderizado en el Lado del Servidor (SSR)

Servir nuevo HTML en cada petición se está convirtiendo cada vez menos necesario con las mejoras en la generación estática. Para aquellas páginas que no cambian frecuentemente, `getStaticProps` / `getStaticPaths` puede ser ejecutado en el momento de compilar. Para contenido más dinámico, la Regeneración Estática Incremental puede construir nuevas páginas en el momento de la petición. ¿Dónde deja esto al [SSR](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering) con `getServerSideProps`?

Con frecuencia verás el renderizado en el servidor mencionado cuando se habla de _Search Engine Optimization_ (SEO). Esta arquitectura proporciona un mejor SEO que el renderizado en el lado del cliente (CSR), pero peor rendimiento que la generación estática. Con el renderizado en el servidor, el llamado [Time to First Byte (TTFB)](https://nextjs.org/docs/advanced-features/measuring-performance#web-vitals) es menor que con `getStaticProps` porque el servidor debe computar el resultado en cada petición. Sin configuración extra, el resultado tampoco puede ser almacenado en caché por una CDN.

El renderizado en el servidor no está desapareciendo [pero sí evolucionando](https://rauchg.com/2020/2019-in-review#static-is-the-new-dynamic). Con la regeneración estática, la primera petición que llega al servidor sirve para construir la página en HTML estática, estando las siguiente peticiones en disposición de guardarse en caché.

## Conclusión

El enfoque híbrido de Next.js nos permite cambir la estrategia de _data-fetching_ en función de la página.

- Utiliza generación estática para la mayoría de casos.
- Utiliza el renderizado en el lado del cliente con SWR si tus datos cambian con mucha frecuencia.
- Muta los datos utilizando API routes.

Para más información, consulta la documentación de Next.js.

- [Pre-renderizado](https://nextjs.org/docs/basic-features/pages#pre-rendering)
- [Traer datos](https://nextjs.org/docs/basic-features/data-fetching)
- [API Routes](https://nextjs.org/docs/api-routes/introduction)
