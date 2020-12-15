import React from 'react';
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
  Avatar,
  Button,
  AspectRatioBox
} from '@chakra-ui/core';

import Container from '../components/Container';
import Subscribe from '../components/Subscribe';

const VideoCard = ({ title, length, href, children, ...rest }) => (
  <Link
    href={href}
    isExternal
    borderRadius={8}
    {...rest}
    _hover={{
      textDecoration: 'none',
      transform: 'scale(1.02)'
    }}
  >
    <Flex direction={['column', 'column', 'row']}>
      <Box
        boxShadow="0px 20px 40px rgba(0, 0, 0, 0.2)"
        borderRadius={8}
        w="250px"
        h="150px"
        mr={8}
        as="img"
        objectFit="cover"
        src="/video.png"
      />
      <Stack>
        <Heading
          letterSpacing="tight"
          as="h3"
          size="md"
          fontWeight="medium"
          mb={0}
          mt={[4, 4, 0]}
        >
          {title}
        </Heading>
        <Text color="gray.600" mb={2} fontSize="xs">
          {length}
        </Text>
        <Text color="gray.700" mb={2} fontSize="sm" maxW="300px">
          {children}
        </Text>
      </Stack>
    </Flex>
  </Link>
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
              Build and deploy a modern SaaS application using the most popular
              open-source software.
            </Text>
            <Button
              as="a"
              href="#course-overview"
              fontWeight="bold"
              h="2.5rem"
              mr={1}
              size="md"
              bg="gray.800"
              color="white"
              _hover={{ bg: 'black' }}
            >
              Watch Now →
            </Button>
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
            "React 2025 helped me <b>leave my front-end comfort zone</b> and
            expand into the full stack." –– Joe Bell
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
            <Box
              as="img"
              alt="React 2025"
              src="/logo.svg"
              width="14px"
              height="14px"
              mr={2}
              mt={1}
            />
            React 2025
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
            end of the course, <b>I launched the product.</b>
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
          <Divider borderColor="gray.200" my={16} w="100%" />
          <Heading
            letterSpacing="tight"
            mt={4}
            as="h2"
            size="lg"
            fontWeight="bold"
          >
            What we're building.
          </Heading>
          <Text color="gray.700" mt={4}>
            In this course, we'll build Fast Feedback – the easiest way to add
            reviews and comments to your site. You can try it out&nbsp;
            <Link
              isExternal
              fontWeight="bold"
              href="https://fastfeedback.io"
              textDecoration="none"
              borderBottom="2px solid #0af5f4"
              transition="all 0.1s ease-in"
              _hover={{
                textDecoration: 'none',
                borderBottom: '2px solid #09DB1F'
              }}
            >
              here.
            </Link>
          </Text>
          <AspectRatioBox mt={8} w="100%" ratio={16 / 9}>
            <Box
              as="iframe"
              title="Fast Feedback Demo"
              src="https://www.loom.com/embed/c086b098bccc4be5a7be297185ce102e"
              allowFullScreen
              h="300px"
              w="100%"
            />
          </AspectRatioBox>
          <Divider borderColor="gray.200" my={16} w="100%" />
          <Heading
            letterSpacing="tight"
            mt={4}
            as="h2"
            size="lg"
            fontWeight="bold"
          >
            What people are saying.
          </Heading>
          <Box
            borderRadius={8}
            border="1px solid"
            borderColor="gray.200"
            p={6}
            mt={8}
            mb={4}
          >
            <Text color="gray.800" fontStyle="italic" fontSize="lg">
              "<b>Seriously incredible work.</b> Your live streams have really
              helped my impostor syndrome. Watching you work is both educational
              and gratifying. Keep it up!"
            </Text>
            <Flex
              color="gray.900"
              mt={2}
              fontWeight="medium"
              pr={8}
              align="center"
              w="full"
            >
              <Link isExternal href="https://twitter.com/michaelschultz">
                <Avatar
                  w="24px"
                  h="24px"
                  name="Michael Schultz"
                  src="https://pbs.twimg.com/profile_images/1161783519099535360/nn7vzYFP_400x400.jpg"
                  mr={2}
                />
              </Link>
              Michael Schultz
            </Flex>
          </Box>
          <Box
            borderRadius={8}
            border="1px solid"
            borderColor="gray.200"
            p={6}
            my={4}
          >
            <Text color="gray.800" fontStyle="italic" fontSize="lg">
              "<b>His teaching style helped me level up</b> and gave me a new
              skill to flex."
            </Text>
            <Flex
              color="gray.900"
              mt={2}
              fontWeight="medium"
              pr={8}
              align="center"
              w="full"
            >
              <Link isExternal href="https://twitter.com/Codebrother1">
                <Avatar
                  w="24px"
                  h="24px"
                  name="TC"
                  src="https://pbs.twimg.com/profile_images/1333576118658469889/Aw2suLWx_400x400.png"
                  mr={2}
                />
              </Link>
              TC
            </Flex>
          </Box>
          <Box
            borderRadius={8}
            border="1px solid"
            borderColor="gray.200"
            p={6}
            mt={4}
          >
            <Text color="gray.800" fontStyle="italic" fontSize="lg">
              "Exceptional teaching material and a very qualified teacher.{' '}
              <b>I never expected so much quality.</b> Lee is a clear and
              precise instructor; his general overview combined with practical
              examples is amazing."
            </Text>
            <Flex
              color="gray.900"
              mt={2}
              fontWeight="medium"
              pr={8}
              align="center"
              w="full"
            >
              <Link isExternal href="https://twitter.com/aboutraffaele">
                <Avatar
                  w="24px"
                  h="24px"
                  name="Raffaele Vitale"
                  src="https://cdn-images-1.medium.com/fit/c/200/200/2*Hr-D00TXI75fkkc3FP8dug.jpeg"
                  mr={2}
                />
              </Link>
              Raffaele Vitale
            </Flex>
          </Box>
          <Divider borderColor="gray.200" my={16} w="100%" />
          <Heading
            letterSpacing="tight"
            as="h2"
            size="lg"
            fontWeight="bold"
            id="course-overview"
          >
            Course Overview
          </Heading>
          <Text color="gray.700" mt={4} mb={8}>
            Join over 1,500 other students who've taken React 2025. All videos
            are
            <b> 100% free.</b> If you'd like to support me, you can
            pay-what-you-want on&nbsp;
            <Link
              isExternal
              fontWeight="bold"
              href="https://gumroad.com/l/TifxZ"
              textDecoration="none"
              borderBottom="2px solid #0af5f4"
              transition="all 0.1s ease-in"
              _hover={{
                textDecoration: 'none',
                borderBottom: '2px solid #09DB1F'
              }}
            >
              Gumroad.
            </Link>
          </Text>
          <Stack mt={8} spacing={8}>
            <VideoCard
              title="Welcome to React 2025"
              length="1:17"
              href="https://www.youtube.com/watch?v=JCOPVq2AYXc&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=1"
            >
              Get excited! The next 15 live streams will teach you how to build
              a real SaaS application.
            </VideoCard>
            <VideoCard
              title="Introduction to React 2025"
              length="1:02:45"
              href="https://youtu.be/MxR5I5_hOKk?list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&t=155&index=2"
            >
              An introduction to the course and an explanation of what we'll
              build.
            </VideoCard>
            <VideoCard
              title="Firestore, Chakra UI, Absolute Imports"
              length="54:22"
              href="https://www.youtube.com/watch?v=AGl52moyISU&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=3"
            >
              Learn about best practices with Next.js data fetching and
              configure Firestore and Chakra UI.
            </VideoCard>
            <VideoCard
              title="Designing & Building the Dashboard"
              length="1:08:30"
              href="https://www.youtube.com/watch?v=3g6-v3_BNbM&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=4"
            >
              Convert Figma designs into real React code and build a dashboard
              page.
            </VideoCard>
            <VideoCard
              title="Firebase Admin with Next.js + SWR"
              length="1:13:45"
              href="https://www.youtube.com/watch?v=u8iv_yhSRI8&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=5"
            >
              Configure Firebase server-side and use API routes + SWR to fetch
              and mutate data.
            </VideoCard>
            <VideoCard
              title="Creating Feedback Pages"
              length="51:35"
              href="https://www.youtube.com/watch?v=1nRWL5ljOqU&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=6"
            >
              Fetch data from Firestore with getStaticProps / getStaticPaths and
              save user feedback with a form.
            </VideoCard>
            <VideoCard
              title="Authentication on API Routes (Firebase JWT)"
              length="45:45"
              href="https://www.youtube.com/watch?v=OndBtUUD8XE&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=7"
            >
              Protect Next.js API routes and redirect to the dashboard. We also
              learn about Incremental Static Regeneration.
            </VideoCard>
            <VideoCard
              title="User Feedback Page + Google Sign In"
              length="51:40"
              href="https://www.youtube.com/watch?v=Fvoi6g52bk0&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=8"
            >
              Learn how to reuse layouts and styles, plus add Sign In with
              Google using Firebase Authentication.
            </VideoCard>
            <VideoCard
              title="Squashing bugs, integration tests, and logging"
              length="55:45"
              href="https://www.youtube.com/watch?v=3YTv_MhmcMI&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=9"
            >
              Set up an integration test on PR runs with Checkly / Puppeteer and
              persist logs to to Logflare.
            </VideoCard>
            <VideoCard
              title="Subscription Payments with Stripe"
              length="1:46:37"
              href="https://www.youtube.com/watch?v=d9HGdw8zwvc&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=10"
            >
              Connect to Stripe to allow users to checkout and manage their
              subscriptions.
            </VideoCard>
            <VideoCard
              title="Managing Site Feedback"
              length="1:12:39"
              href="https://www.youtube.com/watch?v=F4T1ym2QNmE&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=12"
            >
              Creating, updating, and deleting feedback in Firebase through the
              user dashboard.
            </VideoCard>
            <VideoCard
              title="Embed Iframe + Edit/Delete Site"
              length="1:26:20"
              href="https://www.youtube.com/watch?v=Mmt2IbKzIu4&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=13"
            >
              Manage a site's settings through a Modal and mutate your cache
              with SWR.
            </VideoCard>
            <VideoCard
              title="Going to Production + Testing With Checkly"
              length="1:09:20"
              href="https://www.youtube.com/watch?v=huQi7Gnj7zo&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=14"
            >
              Launch the product and write a login end-to-end test with Checkly
              and Puppeteer.
            </VideoCard>
            <VideoCard
              title="Adding MDX"
              length="42:40"
              href="https://www.youtube.com/watch?v=pQDh_82-MXs&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=15"
            >
              Use MDX to create the terms and privacy policy pages for the
              application.
            </VideoCard>
            <VideoCard
              title="Launching Your Product & Conclusion"
              length="6:41"
              href="https://www.youtube.com/watch?v=3Y_Kl00mcvw&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=16"
            >
              That's a wrap! Some final thoughts on how to launch your product.
            </VideoCard>
          </Stack>
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
              <Text color="gray.700" mt={4} fontSize={['sm', 'lg']}>
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
                fontSize={['sm', 'md']}
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
