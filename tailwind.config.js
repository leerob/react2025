module.exports = {
  future: 'all',
  experimental: 'all',
  purge: ['./pages/**/*.js', './components/**/*.js'],
  theme: {
    fontFamily: {
      sans: ['Inter', '-apple-system'],
      serif: ['Inter', '-apple-system']
    },
    fontWeight: {
      regular: '400',
      medium: '600',
      bold: '800'
    },
    maxWidth: {
      lg: '800px',
      md: '600px'
    },
    extend: {
      colors: {
        'brand-blue': '#0AF5F4',
        'brand-green': '#09DB1F',
        'brand-yellow': '#F7F322'
      }
    }
  },
  variants: {},
  plugins: []
};
