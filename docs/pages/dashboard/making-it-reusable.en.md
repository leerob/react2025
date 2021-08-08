# Making It Reusable

Our dashboard is coming along nicely, but so far it's been hardcoded for a list of sites. We'll also want to use this "dashboard shell" for more pages. This includes showing all the user's feedback, as well as the account page. To accomplish this, let's make the dashboard components more reusable.

### Dashboard Shell

- Rather than hardcoding the "My Sites" header as well as the "Add Site" button, we can remove all of that site-specific code from the `DashboardShell` and instead pass whatever React children we want.
- We can also touch up the file by adding `next/link` to actually link to the pages mentioned.

**`components/DashboardShell.js`**

```js {55}
import React from 'react'
import NextLink from 'next/link'
import { Box, Button, Flex, Link, Avatar, Icon } from '@chakra-ui/core'

import { useAuth } from '@/lib/auth'

const DashboardShell = ({ children }) => {
  const { user } = useAuth()

  return (
    <Box backgroundColor="gray.100" h="100vh">
      <Flex
        backgroundColor="white"
        mb={[8, 16]}
        w="full"
        borderTop="5px solid #0AF5F4"
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          pt={4}
          pb={4}
          maxW="1250px"
          margin="0 auto"
          w="full"
          px={8}
          h="60px"
        >
          <Flex align="center">
            <NextLink href="/" passHref>
              <Link>
                <Icon name="logo" size="24px" mr={8} />
              </Link>
            </NextLink>
            <NextLink href="/sites" passHref>
              <Link mr={4}>Sites</Link>
            </NextLink>
            <NextLink href="/feedback" passHref>
              <Link>Feedback</Link>
            </NextLink>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            {user && (
              <NextLink href="/account" passHref>
                <Button as="a" variant="ghost" mr={2}>
                  Account
                </Button>
              </NextLink>
            )}
            <Avatar size="sm" src={user?.photoUrl} />
          </Flex>
        </Flex>
      </Flex>
      <Flex margin="0 auto" direction="column" maxW="1250px" px={[0, 8, 8]}>
        {children}
      </Flex>
    </Box>
  )
}

export default DashboardShell
```

We can now create other, more focused components to forward as children.

```js
<DashboardShell>
  <SiteTableHeader />
  <SiteTableSkeleton />
</DashboardShell>
```

### Header

Now, it's easy for us to use the same `DashboardShell` for both the sites table as well as the feedback table.

**`components/SiteTableHeader.js`**

```js
import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
  Box,
} from '@chakra-ui/core'

const SiteTableHeader = ({ isPaidAccount }) => (
  <Box mx={4}>
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink>Sites</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <Flex justifyContent="space-between">
      <Heading mb={8}>My Sites</Heading>
    </Flex>
  </Box>
)

export default SiteTableHeader
```
