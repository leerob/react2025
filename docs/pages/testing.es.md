# Testeando

![Testing](/testing.png)

Antes de comenzar esta sección, recomiendo encarecidamente leer [Develop, Preview, Test](https://rauchg.com/2020/develop-preview-test) de Guillermo Rauch.

## Checkly

[Checkly](https://www.checklyhq.com/) te permite monitorizar el rendimiento y la exactitud de nuestros endpoints de la API y transacciones vitales de nuestro sitio desde un único y simple cuadro de mandos.

Por debajo, Checkly utiliza [Puppeteer](https://github.com/puppeteer/puppeteer). Esto te permite controlar tu navegador de una forma ["headless"](https://en.wikipedia.org/wiki/Headless_browser) (sin interfaz gráfica). En otras palabras, puedes escribir scripts para interactuar con tu sitio web. ¡Estupendo!

Checkly abstrae la configuración de cualquier infraestructura y te permite concentrarte en escribir tus tests. Estás dentro de una función que luego se invocará para ejecutar la verificación.

## Configurando Checkly y Vercel

Configurar Checkly + Vercel es muy simple gracias a la  [app Checkly GitHub](https://www.checklyhq.com/docs/cicd/github/#setting-up-your-github-integration). Después de conectar tu cuenta, navega a una comprobación individual. Debajo de la pestaña CI/CD, puedes enlazar al repositorio correspondiente. Ahora, cada vez que abras una _pull request_ en GitHub, el check o comprobador se ejecutará.

## Creando un Check de navegador

Vamos a crear un check que se ejecutará en cada pull request. Si el test pasa, entonces la PR será verde y podemos hacer un _merge_ del código. Vamos a empezar con un test simple, y después expandiremos a un test _end-to-end_ completo.

Este check configura Puppeteer, lanza un navegador y navega a nuestro sitio web. Después, hace una simple afirmación (_assertion_) para asegurarse de que el título de la página es correcto.

```js
const assert = require('chai').assert
const puppeteer = require('puppeteer')

const browser = await puppeteer.launch()
const page = await browser.newPage()

await page.goto('https://fastfeedback.io')

const title = await page.title()

assert.equal(title, 'Fast Feedback')

await browser.close()
```

Podemos hacer comprobaciones más complejas aquí, incluso realizar una captura de pantalla si queremos. Si quieres emplear la URL para la previsualización de tu _deploy_, puedes usar la variable de entorno `ENVIRONMENT_URL` que Vercel configura.

```js
process.env.ENVIRONMENT_URL || 'https://fastfeedback.io'
```

## Formulario de Inicio de Sesión

Desafortunadamente, no parece ser una buena forma de testear el inicio de sesión con Google o GitHub a través de un navegador _headless_. ¡No te preocupes! La autenticación por Firebase te permite iniciar sesión con email, por lo que podemos activar esta opción y crear una nueva cuenta para nuestro test automatizado de Checkly.

- Dentro de la consola de Firebase vamos a **Authentication**
- Hacemos click en **Sign-in method**
- Habilitamos email/password
- Hacemos click en **Users**
- Añadimos un nuevo usuario con el que Checkly pueda iniciar sesión

Ahora, podemos actualizar nuestro hook `useAuth` para soportar el inicio de sesión con nombre de usuario/contraseña.

**`lib/auth.js`**

```js
const signinWithEmail = (email, password) => {
  setLoading(true)
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      handleUser(response.user)
      Router.push('/sites')
    })
}
```

Finalmente, podemos crear un formulario de login que permita al usuario introducir las credenciales creadas anteriormente e iniciar sesión en la aplicación.

**`pages/login.js`**

```js
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Icon,
  useToast,
} from '@chakra-ui/core'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

import { useAuth } from '@/lib/auth'
import Page from '@/components/Page'

const Login = () => {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const { signinWithEmail } = useAuth()
  const { handleSubmit, register, errors } = useForm()

  const onLogin = ({ email, pass }) => {
    setLoading(true)
    signinWithEmail(email, pass).catch((error) => {
      setLoading(false)
      toast({
        title: 'An error occurred.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    })
  }

  return (
    <Flex align="center" justify="center" h="100vh" backgroundColor="gray.100">
      <Stack
        as="form"
        backgroundColor="white"
        borderRadius={[0, 8]}
        errors={errors}
        maxWidth="400px"
        onSubmit={handleSubmit((data) => onLogin(data))}
        px={8}
        py={12}
        register={register}
        shadow={[null, 'md']}
        spacing={4}
        w="100%"
      >
        <Flex justify="center">
          <Box as="a" href="/" aria-label="Back to homepage">
            <Icon color="black" name="logo" size="64px" mb={4} />
          </Box>
        </Flex>
        <FormControl isInvalid={errors.email && errors.email.message}>
          <FormLabel>Email Address</FormLabel>
          <Input
            autoFocus
            aria-label="Email Address"
            id="email"
            name="email"
            ref={register({
              required: 'Please enter your email.',
            })}
            placeholder="name@site.com"
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.pass && errors.pass.message}>
          <FormLabel>Password</FormLabel>
          <Input
            aria-label="Password"
            name="pass"
            id="password"
            type="password"
            ref={register({
              required: 'Please enter a password.',
            })}
          />
          <FormErrorMessage>
            {errors.pass && errors.pass.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          id="login"
          type="submit"
          backgroundColor="gray.900"
          color="white"
          isLoading={loading}
          fontWeight="medium"
          mt={4}
          h="50px"
          fontSize="lg"
          _hover={{ bg: 'gray.700' }}
          _active={{
            bg: 'gray.800',
            transform: 'scale(0.95)',
          }}
        >
          Login
        </Button>
      </Stack>
    </Flex>
  )
}

export default Login
```

## Test de Inicio de Sesión

Vamos a escribir un check que inicie sesión en la aplicación y se asegure de que las partes críticas están funcionando como se espera.

Puedes adaptar esto a tu aplicación usando el siguiente flujo de trabajo.

- Determina la ruta que el check usará
- Descrubre las rutas/botones/inputs utilizados
- Añade IDs a los elementos que necesitaremos alcanzar
- Lanza a producción tu aplicación con los últimos cambios

Hay algunas funciones diferentes que probablemente usarás para navegar por tu aplicación dentro del check.

- `page.goto(route)` - Navega a una ruta específica
- `page.type(id, text)` - Controla el navegador para escribir
- `page.click(id)` - Controla el navegador para hacer click
- `page.waitForSelector(id)` - Asegura que el elemento es visible antes de `type`/`click`

```js
const puppeteer = require('puppeteer')
const browser = await puppeteer.launch({ headless: false })
const page = await browser.newPage()

const BASE_URL = process.env.ENVIRONMENT_URL || 'https://yourdomain.com'

await page.setViewport({ width: 1280, height: 800 })
await page.goto(`${BASE_URL}/login`)

const navigationPromise = page.waitForNavigation()

await page.type('#email', 'checkly@yourdomain.com')
await page.type('#password', process.env.PASSWORD)
await page.screenshot({ path: 'login.png' })

await page.waitForSelector('#login')
await page.click('#login')

await page.waitForSelector('#button')
await page.click('#button')

await page.waitForSelector('#input')
await page.click('#input')
await page.type('#input', 'Checkly')

await page.screenshot({ path: 'input.png' })

await browser.close()
```

### Puppeteer Recorder

Puedes utilizar el [Puppeteer Recorder](https://github.com/checkly/puppeteer-recorder) para grabar las interacciones del navegador y automáticamente generar un script de Puppeteer. Esto suena bien en teoría, pero no funciona bien con CSS-in-JS, porque tiene nombres de clases generados automáticamente que cambian.

## Dashboard

Si lo deseas, puedes crear un [dashboard](https://app.checklyhq.com/dashes) público mostrando los checks. Aquí tienes el [Fast Feedback dashboard](https://fastfeedback.checklyhq.com/), por ejemplo.
