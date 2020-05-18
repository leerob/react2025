import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import {
  Heading,
  Flex,
  Stack,
  Box,
  Text,
  List,
  ListItem,
  ListIcon,
  Divider,
  Link,
  Icon,
  Avatar
} from '@chakra-ui/core';

import Container from '../components/Container';
import Subscribe from '../components/Subscribe';

const Tweet = ({ tweetId }) => (
  <Box w="full">
    <TwitterTweetEmbed
      tweetId={tweetId}
      options={{
        conversation: 'none',
        width: '100%'
      }}
    />
  </Box>
);

const Index = () => (
  <Box as="main">
    <Flex justifyContent="center" flexDirection="column" bg="#FBFBFB">
      <Container>
        <Stack
          as="section"
          spacing={8}
          justifyContent="center"
          alignItems="flex-start"
          m={['0 auto', null, '0 auto 4rem auto']}
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
              fontWeight="bold"
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
        mt={[4, 8, 16]}
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
            fontWeight="bold"
          >
            “Building modern web apps is too difficult.”
          </Heading>
          <Text color="gray.700" mb={4}>
            Have you tried to launch a project only to get stuck trying to do it
            "the right way"? I've been there. I'd waste time dealing with
            complex tech instead of shipping products. Then, I started building
            apps like it's 2025.
          </Text>
          <Text color="gray.700" mb={4}>
            Spend less time doing the things you hate.
          </Text>
          <List spacing={2} mt={4}>
            <ListItem
              fontWeight="medium"
              fontSize="lg"
              alignItems="center"
              display="flex"
            >
              <ListIcon icon="x" color="red.500" />
              Provisioning Servers
            </ListItem>
            <ListItem
              fontWeight="medium"
              fontSize="lg"
              alignItems="center"
              display="flex"
            >
              <ListIcon icon="x" color="red.500" />
              What is Kubernetes?
            </ListItem>
            <ListItem
              fontWeight="medium"
              fontSize="lg"
              alignItems="center"
              display="flex"
            >
              <ListIcon icon="x" color="red.500" />
              Dealing with Webpack
            </ListItem>
            <ListItem
              fontWeight="medium"
              fontSize="lg"
              alignItems="center"
              display="flex"
            >
              <ListIcon icon="x" color="red.500" />
              Cross-browser issues
            </ListItem>
          </List>
          <Text color="gray.700" mb={4} mt={8}>
            And more time doing the things you <b>love.</b>
          </Text>
          <List spacing={2} mt={4}>
            <ListItem
              fontWeight="medium"
              fontSize="lg"
              alignItems="center"
              display="flex"
            >
              <ListIcon icon="check" color="green.500" />
              Building your product
            </ListItem>
            <ListItem
              fontWeight="medium"
              fontSize="lg"
              alignItems="center"
              display="flex"
            >
              <ListIcon icon="check" color="green.500" />
              Deploying with ease
            </ListItem>
            <ListItem
              fontWeight="medium"
              fontSize="lg"
              alignItems="center"
              display="flex"
            >
              <ListIcon icon="check" color="green.500" />
              Making your customers happy
            </ListItem>
            <ListItem
              fontWeight="medium"
              fontSize="lg"
              alignItems="center"
              display="flex"
            >
              <ListIcon icon="check" color="green.500" />
              Working with modern tools
            </ListItem>
          </List>
          <Divider borderColor="gray.200" my={16} w="100%" />
          <Heading
            letterSpacing="tight"
            mt={4}
            as="h2"
            size="lg"
            fontWeight="bold"
          >
            Transform front-end to full-stack.
          </Heading>
          <Text color="gray.700" mt={4}>
            Are you frustrated with how long it takes to go from idea to
            production? As a front-end developer, I wanted to
            <b> bring my ideas to life.</b> Not just the front-end, but the full
            stack.
          </Text>
          <Text color="gray.700" mt={4}>
            Then, I discovered the{' '}
            <Link
              isExternal
              fontWeight="bold"
              href="https://jamstack.wtf"
              textDecoration="none"
              borderBottom="2px solid #0af5f4"
              transition="all 0.1s ease-in"
              _hover={{
                textDecoration: 'none',
                borderBottom: '2px solid #09DB1F'
              }}
            >
              Jamstack
            </Link>
            &nbsp;and the optimal workflow for front-end developers.
          </Text>
          <List spacing={2} mt={8} as="ol" styleType="decimal">
            <ListItem fontWeight="medium" fontSize="lg">
              Build dynamic applications that become static.
            </ListItem>
            <ListItem fontWeight="medium" fontSize="lg">
              Push code to a repository with Git.
            </ListItem>
            <ListItem fontWeight="medium" fontSize="lg">
              Deploy instantly to a global CDN.
            </ListItem>
          </List>
          <Text color="gray.700" mt={16} fontStyle="italic" fontSize="lg">
            "Not only did I enjoy your Mastering Next.js course, but I learned
            many things entirely new to me. This course opened my eyes to what's
            possible and what you can achieve with these technologies." –– José
            Llamas
          </Text>
          <Flex
            color="gray.900"
            mt={2}
            fontWeight="bold"
            pr={8}
            align="center"
            justify="flex-end"
            w="full"
          >
            <Icon name="nextjs" mr={2} />
            Mastering Next.js
          </Flex>
          <Divider borderColor="gray.200" my={16} w="100%" />
          <Heading
            letterSpacing="tight"
            mt={4}
            as="h2"
            size="lg"
            fontWeight="bold"
          >
            Not your typical course.
          </Heading>
          <Text color="gray.700" mt={4}>
            Are you tired of courses that don't show real-world applications? In
            my last course, I showed how to build an application with a
            database, authentication, and more. But I never launched it.
          </Text>
          <Text color="gray.700" mt={4}>
            This course will show the journey from zero lines of code to
            production for a real SaaS app. This isn't another example. At the
            end of the course, <b>I'm launching the product.</b>
          </Text>
          <List spacing={2} mt={12}>
            <ListItem
              fontWeight="medium"
              fontSize="lg"
              alignItems="center"
              display="flex"
            >
              <ListIcon icon="check" color="green.500" />
              Next.js / React
            </ListItem>
            <ListItem
              fontWeight="medium"
              fontSize="lg"
              alignItems="center"
              display="flex"
            >
              <ListIcon icon="check" color="green.500" />
              Firebase Authentication / Firestore
            </ListItem>
            <ListItem
              fontWeight="medium"
              fontSize="lg"
              alignItems="center"
              display="flex"
            >
              <ListIcon icon="check" color="green.500" />
              Subscription payments with Stripe
            </ListItem>
            <ListItem
              fontWeight="medium"
              fontSize="lg"
              alignItems="center"
              display="flex"
            >
              <ListIcon icon="check" color="green.500" />
              Deployed serverless to Vercel
            </ListItem>
          </List>
          <Text color="gray.700" mt={16} fontStyle="italic" fontSize="lg">
            "Lee is an awesome teacher and I really enjoyed taking this course.
            It not only touches on the core of Next.js, but also broader
            concepts like TypeScript, testing and authentication. Videos are
            great quality and good length. I would definitely recommend to both
            newcomers to Next.js as well as to people who want to sharpen
            themselves on the Next.js fundamentals." –– Maurits Misana
          </Text>
          <Flex
            color="gray.900"
            mt={2}
            fontWeight="bold"
            pr={8}
            align="center"
            justify="flex-end"
            w="full"
          >
            <Icon name="nextjs" mr={2} />
            Mastering Next.js
          </Flex>
          <Divider borderColor="gray.200" my={16} w="100%" />
          <Tweet tweetId="1262266180573806597" />
          <Tweet tweetId="1262312140586618882" />
          <Tweet tweetId="1262274160018915328" />
          <Tweet tweetId="1262300081841008646" />
          <Divider borderColor="gray.200" my={8} w="100%" />
          <Subscribe />
          <Flex align="center">
            <Avatar
              size="lg"
              name="Lee Robinson"
              src="https://bit.ly/33vEjhB"
              mr={4}
            />
            <Box>
              <Text color="gray.700" mt={4} fontSize={['md', 'lg']}>
                <b>I'm Lee Robinson</b> –– developer, writer, and the creator of
                Mastering Next.js and React 2025.
              </Text>
              <Link
                mt={2}
                isExternal
                href="https://leerob.io"
                textDecoration="none"
                borderBottom="2px solid #0af5f4"
                transition="all 0.1s ease-in"
                fontStyle="italic"
                _hover={{
                  textDecoration: 'none',
                  borderBottom: '2px solid #09DB1F'
                }}
              >
                more about me &#187;
              </Link>
            </Box>
          </Flex>
        </Flex>
      </Stack>
    </Flex>
  </Box>
);

export default Index;
