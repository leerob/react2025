module.exports = {
  title: 'React 2025',
  tagline: 'Build applications from the future, today.',
  url: 'https://docs.react2025.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'leerob',
  projectName: 'react2025',
  themeConfig: {
    navbar: {
      title: 'React 2025',
      logo: {
        alt: 'React 2025 Logo',
        src: 'img/logo.svg'
      },
      links: [
        {
          to: '/welcome',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left'
        },
        {
          href: 'https://github.com/leerob/react2025',
          label: 'Videos',
          position: 'left'
        },
        {
          href: 'https://github.com/leerob/react2025',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',

      copyright: `Copyright © ${new Date().getFullYear()} – Lee Robinson`
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/leerob/react2025/edit/master/docs/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ]
};
