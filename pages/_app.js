import 'tailwindcss/tailwind.css';
import React, { useEffect } from 'react';
import { DefaultSeo } from 'next-seo';
import Router from 'next/router';
import * as Fathom from 'fathom-client';

import SEO from '../next-seo.config';

// const GlobalStyle = ({ children }) => (
//   <>
//     <CSSReset />
//     <Global
//       styles={css`
//         ::selection {
//           background-color: #0af5f4;
//           color: #fefefe;
//         }

//         html {
//           min-width: 360px;
//           scroll-behavior: smooth;
//         }

//         #__next {
//           display: flex;
//           flex-direction: column;
//           min-height: 100vh;
//           background: white;
//         }
//       `}
//     />
//     {children}
//   </>
// );

Router.events.on('routeChangeComplete', () => {
  Fathom.trackPageview();
});

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      Fathom.load(process.env.NEXT_PUBLIC_FATHOM_SITE_ID, {
        includedDomains: ['react2025.com']
      });
    }
  }, []);

  return (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  );
};

export default App;
