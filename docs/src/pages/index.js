import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { Redirect } from '@docusaurus/router';
// eslint-disable-next-line import/no-unresolved
import useBaseUrl from '@docusaurus/useBaseUrl';

const Home = () => {
  return <Redirect to={useBaseUrl('/getting-started')} />;
};

export default Home;
