export default {
  github: 'https://github.com/leerob/react2025',
  docsRepositoryBase: 'https://github.com/leerob/react2025',
  branch: 'main',
  path: '/docs',
  titleSuffix: ' – React 2025',
  nextLinks: true,
  prevLinks: true,
  search: true,
  darkMode: true,
  footer: true,
  footerText: `${new Date().getFullYear()} © Lee Robinson.`,
  footerEditOnGitHubLink: true,
  logo: (
    <>
      <span className="mr-2 font-extrabold hidden md:inline">React 2025</span>
      <span className="text-gray-600 font-normal hidden md:inline">
        Documentation
      </span>
    </>
  ),
  head: () => (
    <>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta
        name="description"
        content="React 2025 – Build applications from the future, today."
      />
      <meta
        name="og:description"
        content="React 2025 – Build applications from the future, today."
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@leeerob" />
      <meta
        name="og:title"
        content="React 2025 – Build applications from the future, today."
      />
      <meta
        name="twitter:image"
        content="https://react-2025-docs.vercel.app/og.png"
      />
      <meta
        name="og:image"
        content="https://react-2025-docs.vercel.app/og.png"
      />
      <meta name="apple-mobile-web-app-title" content="React 2025" />
      <link href="/favicon.ico" rel="shortcut icon" />
    </>
  ),
  i18n: [
    { locale: 'en', text: 'English' },
    { locale: 'es', text: 'Español' }
  ]
};
