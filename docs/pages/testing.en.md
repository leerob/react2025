# Testing

![Testing](/testing.png)

Before starting this section, I'd highly recommend reading [Develop, Preview, Test](https://rauchg.com/2020/develop-preview-test) by Guillermo Rauch.

## Checkly

[Checkly](https://www.checklyhq.com/) allows you to monitor the performance and correctness of your API endpoints & vital site transactions from a single, simple dashboard.

Under the hood, Checkly uses [Puppeteer](https://github.com/puppeteer/puppeteer). It allows you to control you browser in a ["headless"](https://en.wikipedia.org/wiki/Headless_browser) fashion. This means you can write scripts to interact with your website. Neat!

Checkly abstracts away setting up any infrastructure and allows you to focus on writing your tests. You're inside a function that will later be invoked to run your check.

## Configuring Checkly & Vercel

Setting up Checkly + Vercel is easy thanks to the [Checkly GitHub app](https://www.checklyhq.com/docs/cicd/github/#setting-up-your-github-integration). After connecting your account, navigate to an individual check. Under the CI/CD tab, you can link it to the corresponding repository. Now, whenever you open a pull request on GitHub, the check will execute.

## Creating a Browser Check

Let's create a check that will run over every pull request (PR). If the test passes, then the PR is green and we are good to merge. Let's start with a really simple test, and then we'll expand it to a full end-to-end test.

This check sets up Puppeteer, launches a browser, and navigates to our website. Then, it makes a simple assertion to ensure that the title of the page is correct.

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

We can also do more complex checks here, including taking screenshot, if we want. If you want to use the URL from your deploy preview, you can use the `ENVIRONMENT_URL` environment variable that Vercel sets.

```js
process.env.ENVIRONMENT_URL || 'https://fastfeedback.io'
```

## Login Form

Unfortunately, there doesn't appear to be a good way to test Google or GitHub login through a headless browser. No worries, though! Firebase Authentication allows you to sign-in with email, so we can enable that option and create a new account for our Checkly automated test.

- Inside the Firebase Console, go to **Authentication**
- Click on **Sign-in method**
- Enable email/password
- Click on **Users**
- Add a new user for Checkly to login with

Now, we can update our `useAuth` hook to support logging in with username/password.

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

Finally, we can create a login form that allows the user to enter
the credentials previously created and log into the application.

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

## Login Test

Let's write a check that logins into the application and ensures
critical pieces are working as expected.

You can adapt this to your application using the following workflow.

- Determine the route the check will take
- Figure out the routes/buttons/inputs used
- Add IDs to elements we'll need to target
- Deploy your application with the latest changes

There are a few different functions you'll likely use to navigation around
your application inside the check.

- `page.goto(route)` - Navigate to a specific route
- `page.type(id, text)` - Control the browser to type
- `page.click(id)` - Control the browser to click
- `page.waitForSelector(id)` - Ensure element is visible before `type`/`click`

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

You can use the [Puppeteer Recorder](https://github.com/checkly/puppeteer-recorder) to record your browser interactions and automatically
generate a Puppeteer script. This sounds great in theory, but doesn't work
well with CSS-in-JS, because it has auto-generated class names that change.

## Dashboard

If you'd like, you can create a public [dashboard](https://app.checklyhq.com/dashes) showing off your checks. Here's the [Fast Feedback dashboard](https://fastfeedback.checklyhq.com/), for example.
