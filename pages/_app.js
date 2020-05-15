import React from 'react';
import NextApp from 'next/app';
import { Global, css } from '@emotion/core';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';

import theme from '../styles/theme';
import SEO from '../next-seo.config';

const GlobalStyle = ({ children }) => (
  <>
    <CSSReset />
    <Global
      styles={css`
        ::selection {
          background-color: #0af5f4;
          color: #fefefe;
        }

        html {
          min-width: 360px;
          scroll-behavior: smooth;
        }

        #__next {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: white;
        }
      `}
    />
    {children}
  </>
);

class App extends NextApp {
  render() {
    const { Component } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle>
          <DefaultSeo {...SEO} />
          <Component />
        </GlobalStyle>
      </ThemeProvider>
    );
  }
}

export default App;
