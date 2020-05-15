import React from 'react';
import NextLink from 'next/link';
import { Flex, Box } from '@chakra-ui/core';

const Container = ({ children }) => (
  <>
    <Box bg="#FBFBFB">
      <Box
        background="linear-gradient(270deg, #0AF5F4 25.28%, #09DB1F 59.7%, #F7F322 97.75%)"
        w="full"
        h="10px"
      />
      <Flex
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
      </Flex>
    </Box>
    {children}
  </>
);

export default Container;
