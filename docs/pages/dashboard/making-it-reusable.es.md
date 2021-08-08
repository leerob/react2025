# Haciéndolo Reusable

Nuestro _dashboard_ está funcionando bien, pero hasta ahora ha sido programado para una lista de sitios. También queremos usar este "panel de control" para más páginas. Esto incluye mostrar todos los comentarios del usuario, así como la página de la cuenta. Para conseguir esto, vamos a hacer que los componentes del tablero sean más reutilizables.

### Envoltura del Dashboard

- Más allá de programar directamente la cabecera de My Sites" así como el botón de "Add Site", vamos a eliminar todo este código de `DashboardShell` y, en su lugar, vamos a pasar cualquier componente _children_ de React que queramos.
- Vamos a modificar también el fichero para añadir `next/link` y así enlazar a las páginas mencionadas.

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

Ahora podemos crear otros componentes más específicos que los pasaremos como un componente hijo o _children_.

```js
<DashboardShell>
  <SiteTableHeader />
  <SiteTableSkeleton />
</DashboardShell>
```

### Cabecera

Ahora, es fácil para nosotros emplear el mismo `DashboardShell` tanto para la tabla de sitios como para la tabla de _feedback_.

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
