import React from 'react';
import { Heading, Flex } from '@chakra-ui/core';

const Step = ({ number, title }) => (
  <Flex align="center" mt={4}>
    <Flex
      borderRadius="50%"
      border="1px solid"
      borderColor="gray.100"
      h="40px"
      w="40px"
      fontWeight="black"
      color="blue.500"
      align="center"
      justify="center"
      boxShadow="0px 4px 20px rgba(0, 0, 0, 0.05)"
    >
      {number}
    </Flex>
    <Heading
      ml={3}
      letterSpacing="tight"
      as="h3"
      size="md"
      fontWeight="medium"
      lineHeight="1"
    >
      {title}
    </Heading>
  </Flex>
);

export default Step;
