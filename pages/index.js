import React from 'react';
import { Heading, Flex, Stack, Box, Text } from '@chakra-ui/core';

import Container from '../components/Container';
import Subscribe from '../components/Subscribe';

const Index = () => (
  <Box as="main">
    <Flex justifyContent="center" flexDirection="column" bg="#FBFBFB">
      <Container>
        <Stack
          as="section"
          spacing={8}
          justifyContent="center"
          alignItems="flex-start"
          m="0 auto 4rem auto"
          maxWidth="600px"
          p={8}
        >
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            maxWidth="600px"
          >
            <Heading
              letterSpacing="tight"
              mb={4}
              as="h1"
              size="2xl"
              fontWeight="800"
            >
              Start developing
              <Box>
                websites{' '}
                <Box display="inline" backgroundColor="#0af5f4">
                  like it's 2025.
                </Box>
              </Box>
            </Heading>
            <Text color="gray.700" mb={4} fontSize="lg">
              Build and deploy a modern Jamstack application using the most
              popular open-source software.
            </Text>
            <Subscribe />
          </Flex>
        </Stack>
      </Container>
    </Flex>
    <Flex justifyContent="center" flexDirection="column">
      <Stack
        as="section"
        spacing={8}
        justifyContent="center"
        alignItems="flex-start"
        m="0 auto 4rem auto"
        maxWidth="600px"
        mt={16}
        p={8}
      >
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="600px"
        >
          <Heading
            letterSpacing="tight"
            mb={4}
            as="h2"
            size="lg"
            fontWeight="800"
          >
            “Building modern web apps is way too difficult.”
          </Heading>
          <Text color="gray.700" mb={4}>
            Learn how to build and deploy a modern Jamstack application using
            the most popular open-source software.
          </Text>
          <Text color="gray.700" mb={4}>
            Spend less time doing the things you hate.
          </Text>
        </Flex>
      </Stack>
    </Flex>
  </Box>
);

export default Index;
