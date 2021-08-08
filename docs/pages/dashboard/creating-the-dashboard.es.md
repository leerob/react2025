# Creando el Dashboard

Vamos a comenzar creando el _dashboard_ de usuario para [Fast Feedback](/introduction/product-overview). Este dashboard permitirá a los usuarios gestionar sus sitios, así como el propio feedback que ellos hayan dejado.

![Dashboard Architecture](/admin-architecture.png)

Todas las distinas páginas dentro del cuadro de mandos deberán compartir el mismo _layout_ o estructura base.

Vamos a crear un componente de _layout_ compartido que todas las páginas del _dashboard_ puedan re-utilizar. Este deberá contener la navegación superior, así como el usuario actual que ha iniciado sesión. Esta "envoltura" deberá contener a los otros componentes. Por ejemplo:

```js
<DashboardShell>
  <Component />
</DashboardShell>
```

### Envoltura del Dashboard

¿Recuerdas nuestro [hook de autenticación](/use-auth) que creamos anteriormente? Podemos usar esto para traer el usuario actual que ha iniciado sesión.

```js
import { useAuth } from '@/lib/auth';

const { user } = useAuth();
```

Después, necesitamos utilizar los componentes de Chakra para darle estilo a la barra de navegación, de forma que esta contenga:

- Enlaces para tus sitios y feedback
- Información de la cuenta
- Imagen de perfil del usuario actual

Cuando estábamos creando el _schema_ de `User`, añadimos un campo de `photoUrl` traída desde la plataforma social desde la que el usuario ha iniciado sesión. Vamos a usar esto para mostrar una foto de perfil en la parte superior derecha.

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
