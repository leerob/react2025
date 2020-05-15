import React from 'react';
import NextLink from 'next/link';
import { Flex, Box } from '@chakra-ui/core';
import styled from '@emotion/styled';

const StickyNav = styled(Flex)`
  position: sticky;
  z-index: 10;
  top: 0;
  backdrop-filter: saturate(180%) blur(20px);
  transition: background-color 0.1 ease-in-out;
`;

const Container = ({ children }) => (
  <>
    <Box bg="#FBFBFB">
      <Box
        background="linear-gradient(270deg, #0AF5F4 25.28%, #09DB1F 59.7%, #F7F322 97.75%)"
        w="full"
        h="10px"
      />
      <StickyNav
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        maxWidth="800px"
        width="100%"
        as="nav"
        p={8}
        mt={[0, 0, 8]}
        mb={[0, 0, 8]}
        mx="auto"
      >
        <NextLink href="/" passHref>
          <Box as="a">
            <Box
              as="img"
              alt="jamstackfns"
              src="/logo.svg"
              width="32px"
              height="32px"
            />
          </Box>
        </NextLink>
      </StickyNav>
    </Box>
    {children}
  </>
);

export default Container;
