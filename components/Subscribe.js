import React, { useRef, useState } from 'react';
import {
  Heading,
  InputGroup,
  Box,
  Input,
  InputRightElement,
  Button,
  Text,
  Link,
  useToast
} from '@chakra-ui/core';

const Subscribe = () => {
  const [loading, setLoading] = useState(false);
  const inputEl = useRef(null);
  const toast = useToast();

  const subscribe = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({
        email: inputEl.current.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    setLoading(false);
    const { error } = await res.json();

    if (error) {
      toast({
        title: 'An error occurred.',
        description: error,
        status: 'error',
        duration: 3000,
        isClosable: true
      });

      return;
    }

    window.fathom.trackGoal('MW8HUEX3', 0);
    inputEl.current.value = '';
    toast({
      title: 'Success!',
      description: 'You are now subscribed.',
      status: 'success',
      duration: 3000,
      isClosable: true
    });
  };

  return (
    <Box m={8} w="100%" mx="auto" as="form">
      <Heading as="h5" size="xs" mb={1} color="gray.900" fontWeight="medium">
        Sign up for our newsletter to get free previews of React 2025 as it’s
        built.
      </Heading>
      <InputGroup size="lg" mt={2}>
        <Input
          aria-label="Email for newsletter"
          placeholder="Enter your email"
          ref={inputEl}
          type="email"
          fontSize="md"
        />
        <InputRightElement width="8.5rem">
          <Button
            isLoading={loading}
            fontWeight="bold"
            h="2.5rem"
            mr={1}
            size="md"
            onClick={subscribe}
            bg="gray.800"
            color="white"
            _hover={{ bg: 'black' }}
          >
            Get Updates
          </Button>
        </InputRightElement>
      </InputGroup>
      <Text fontSize="xs" mt={2} color="gray.700">
        Or&nbsp;
        <Link
          fontWeight="bold"
          href="#pre-order"
          textDecoration="none"
          borderBottom="2px solid #0af5f4"
          transition="all 0.1s ease-in"
          _hover={{
            textDecoration: 'none',
            borderBottom: '2px solid #09DB1F'
          }}
        >
          pre-order now
        </Link>
        &nbsp;if you're already convinced!
      </Text>
    </Box>
  );
};

export default Subscribe;
