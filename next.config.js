module.exports = {
  experimental: {
    modern: true
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./scripts/generate-sitemap');
    }

    /*
     * https://github.com/developit/nextjs-preact-demo
     * https://preactjs.com/guide/v10/differences-to-react
     */
    const splitChunks = config.optimization && config.optimization.splitChunks;

    if (splitChunks) {
      const cacheGroups = splitChunks.cacheGroups;
      const preactModules = /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/u;

      if (cacheGroups.framework) {
        cacheGroups.preact = {
          ...cacheGroups.framework,
          test: preactModules
        };
        cacheGroups.commons.name = 'framework';
      } else {
        cacheGroups.preact = {
          name: 'commons',
          chunks: 'all',
          test: preactModules
        };
      }
    }

    // eslint-disable-next-line no-param-reassign
    const aliases = config.resolve.alias || (config.resolve.alias = {});

    aliases.react = aliases['react-dom'] = 'preact/compat';

    return config;
  }
};
