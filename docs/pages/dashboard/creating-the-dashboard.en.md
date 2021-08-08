# Creating the Dashboard

Let's begin creating the user dashboard for [Fast Feedback](/introduction/product-overview). This dashboard will allow users to manage their sites, as well as their own feedback they've left.

![Dashboard Architecture](/admin-architecture.png)

All the different pages inside the admin dashboard should share the same base layout.
Let's create a shared layout component that all dashboard pages can re-use. This should contain the top navigation, as well as the current user that's logged in. This "shell" will wrap other components. For example:

```js
<DashboardShell>
  <Component />
</DashboardShell>
```

### Dashboard Shell

Remember our [authentication hook](/use-auth) we created earlier? We can use that to fetch the currently logged in user.

```js
import { useAuth } from '@/lib/auth';

const { user } = useAuth();
```

Then, we need to use Chakra's components to style a navigation bar containing:

- Links for your sites and feedback
- Account information
- User's current profile image

When creating our `User` schema, we included `photoUrl` pulled from the social platform they logged in with. Let's use that to display a profile photo in the top right.

**`components/DashboardShell.js`**

```js
import React from 'react';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Button,
  Flex,
  Link,
  Avatar
} from '@chakra-ui/core';

import { useAuth } from '@/lib/auth';

const DashboardShell = ({ children }) => {
  const { user } = useAuth();

  return (
    <Box backgroundColor="gray.100" h="100vh">
      <Flex backgroundColor="white" mb={16} w="full">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          pt={4}
          pb={4}
          maxW="1250px"
          margin="0 auto"
          w="full"
          px={8}
        >
          <Flex>
            <Link mr={4}>Sites</Link>
            <Link>Feedback</Link>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <Link mr={4}>Account</Link>
            <Avatar size="sm" src={user?.photoUrl} />
          </Flex>
        </Flex>
      </Flex>
      <Flex margin="0 auto" direction="column" maxW="1250px" px={8}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink>Sites</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent="space-between">
          <Heading mb={8}>My Sites</Heading>
          <Button
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            _hover={{ bg: 'gray.700' }}
            _active={{
              bg: 'gray.800',
              transform: 'scale(0.95)'
            }}
          >
            + Add Site
          </Button>
        </Flex>
        {children}
      </Flex>
    </Box>
  );
};

export default DashboardShell;
```
