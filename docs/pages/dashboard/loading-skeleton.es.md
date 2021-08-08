# Cargando el Esqueleto

Es inevitable para muchos usuarios de vuestra aplicación que tengan conexiones lentas a Internet. Un diseño bien pensado tiene en cuenta las diferentes velocidades de Internet y muestra un estado de carga al usuario. Sin embargo, hacer que el usuario mire fijamente un _spinner_ o rueda giratoria durante un período largo de tiempo puede aumentar drásticamente las tasas de rebote. ¿Y si hubiera una forma mejor?

### Pantallas de Esqueleto

Las pantallas de esqueleto (_skeleton screens_) construyen una anticipación del contenido que va a aparecer mientras que los _spinners_ (y las barras de progreso) ponen el foco en el tiempo de espera que el usuario tiene que aguantar. Apple está lo suficientemente de acuerdo con esta idea como para incorporar pantallas de esqueleto dentro de sus [Guías de Interfaces Humanas de iOS](https://developer.apple.com/ios/human-interface-guidelines/icons-and-images/launch-screen/). Recomiendan mostrar un esquema de la aplicación inicial sin texto ni ningún elemento que vaya a cambiar. Esto puede mejorar la sensación de cualquier acción que dure más de unos pocos cientos de milisegundos.

### Ejemplos

Por ahora, probablemente has visto algunos ejemplos de _skeleton screens_ en tu navegación diaria por Internet sin apenas darte cuenta de ello. Por ejemplo, Facebook muestra a sus usuarios círculos grises y líneas para representar los contenidos de los posts dentro de su _timeline_.

![Facebook Placeholder](https://leerob.io/static/images/loading-placeholder-with-sass/facebook.png)

No es solo Facebook quien hace esto. [LinkedIn](https://www.linkedin.com) también ha rediseñado su interfaz para incluir estos _placeholders_.

![LinkedIn Placeholder](https://leerob.io/static/images/loading-placeholder-with-sass/linkedin.png)

Tú también puedes mostrar esto a tus usuarios para que piensen que tu sitio web se carga más rápido mediante el uso de pantallas de esqueleto.

### Construyendo un Esqueleto de Carga

Por suerte, [Chakra UI](https://chakra-ui.com/) hace esto por nosotros. Ellos proporcionan un componente de `Skeleton`, permitiéndonos fácilmente simular el aspecto de nuestra tablas de sitios.

**`components/SiteTableSkeleton.js`**

```js
import React from 'react'
import { Box, Skeleton } from '@chakra-ui/core'
import { Table, Tr, Th, Td } from './Table'

const SkeletonRow = ({ width }) => (
  <Box as="tr">
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
  </Box>
)

const SiteTableSkeleton = () => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th>
          <Th>Date Added</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        <SkeletonRow width="75px" />
        <SkeletonRow width="125px" />
        <SkeletonRow width="50px" />
        <SkeletonRow width="100px" />
        <SkeletonRow width="75px" />
      </tbody>
    </Table>
  )
}

export default SiteTableSkeleton
```

Te habrás dado cuenta de que también he creado una archivo `Table` exportando algunas piezas compuestas que usaremos para construir tanto la tabla de esqueleto como la tabla real.

**`components/Table.js`**

```js
import React from 'react'
import { Box, Text } from '@chakra-ui/core'

export const Th = (props) => (
  <Text
    as="th"
    textTransform="uppercase"
    fontSize="xs"
    color="gray.500"
    fontWeight="medium"
    px={4}
    {...props}
  />
)

export const Td = (props) => (
  <Box
    as="td"
    color="gray.900"
    p={4}
    borderBottom="1px solid"
    borderBottomColor="gray.100"
    {...props}
  />
)

export const Tr = (props) => (
  <Box
    as="tr"
    backgroundColor="gray.50"
    borderTopLeftRadius={8}
    borderTopRightRadius={8}
    borderBottom="1px solid"
    borderBottomColor="gray.200"
    height="40px"
    {...props}
  />
)

export const Table = (props) => {
  return (
    <Box
      as="table"
      textAlign="left"
      backgroundColor="white"
      ml={0}
      mr={0}
      borderRadius={8}
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)"
      {...props}
    />
  )
}
```

### Resultado

![Loading Skeleton](/loading-skeleton.png)

### Recursos

- [The Nine States of Design](https://medium.com/swlh/the-nine-states-of-design-5bfe9b3d6d85)
- [How the Facebook content placeholder works](https://cloudcannon.com/deconstructions/2014/11/15/facebook-content-placeholder-deconstruction.html)
