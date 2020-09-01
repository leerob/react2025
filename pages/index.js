import Link from 'next/link';

const ConListItem = ({ children }) => (
  <li className="flex items-center my-1">
    <svg
      className="h-5 text-red-500 mr-2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <span className="text-lg font-medium">{children}</span>
  </li>
);

const ProListItem = ({ children }) => (
  <li className="flex items-center my-1">
    <svg
      className="h-5 text-green-500 mr-2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <span className="text-lg font-medium">{children}</span>
  </li>
);

{
  /* <Box bg="#FBFBFB">
  <Box
    background="linear-gradient(270deg, #0AF5F4 25.28%, #09DB1F 59.7%, #F7F322 97.75%)"
    w="full"
    h="15px"
  />
  <Flex
    flexDirection="row"
    justifyContent="space-between"
    alignItems="center"
    maxWidth="800px"
    width="100%"
    as="nav"
    p={8}
    mt={[0, 0, 8]}
    mb={[0, 0, 8]}
    mx="auto"
  >
    <NextLink href="/" passHref>
      <Box as="a">
        <Box
          as="img"
          alt="jamstackfns"
          src="/logo.svg"
          width="32px"
          height="32px"
        />
      </Box>
    </NextLink>
  </Flex>
</Box>; */
}

export default function Index() {
  return (
    <>
      <header className="bg-gray-50">
        <div className="h-4 w-full bg-gradient-to-r from-brand-yellow via-brand-green to-brand-blue" />
        <nav className="max-w-lg p-8 mx-auto my-8">
          <Link href="/">
            <a>
              <img className="h-8 w-8" alt="React 2025" src="/logo.svg" />
            </a>
          </Link>
        </nav>
        <section className="max-w-md p-8 mx-auto pb-32">
          <h1 className="mb-4 text-5xl font-bold tracking-tight">
            Start developing
            <span className="mt-3 block">
              websites
              <span className="inline bg-brand-blue mx-2">like it's 2025.</span>
            </span>
          </h1>
          <p className="text-gray-700 text-lg mb-8">
            Build and deploy a modern Jamstack application using the most
            popular open-source software.
          </p>
          <p className="font-medium text-sm mb-2">
            Sign up for my newsletter and get two free videos from the course.
          </p>
          <div className="relative">
            <input
              aria-label="Email address"
              name="email"
              type="email"
              required
              className="h-12 w-full px-4 py-2 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:leading-5"
              placeholder="Enter your email"
            />
            <div className="absolute top-0 z-10 right-0 mt-1 mr-1">
              <button className="text-white px-4 py-2 rounded-md font-medium bg-gray-900 hover:bg-gray-700 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition duration-150 ease-in-out">
                Watch Now
              </button>
            </div>
          </div>
          <p className="text-xs mt-2">
            Or
            <a className="font-medium mx-1" href="#buy-now">
              buy now
            </a>
            if you're already convinced!
          </p>
        </section>
      </header>
      <main>
        <section className="m-auto max-w-md mt-8 px-8 py-12">
          <h2 className="mb-4 text-2xl font-bold tracking-tight">
            “Building modern web apps is too difficult.”
          </h2>
          <p className="text-gray-700 mb-4">
            Have you tried to launch a project only to get stuck trying to do it
            "the right way"? I've been there. I'd waste time dealing with
            complex tech instead of shipping products. Then, I started building
            apps like it's 2025.
          </p>
          <p className="text-gray-700">
            Spend less time doing the things you hate.
          </p>
          <ul className="my-6">
            <ConListItem>Provisioning Servers</ConListItem>
            <ConListItem>What is Kubernetes?</ConListItem>
            <ConListItem>Dealing with Webpack</ConListItem>
            <ConListItem>Cross-browser issues</ConListItem>
          </ul>
          <p className="text-gray-700">
            And more time doing the things you <strong>love.</strong>
          </p>
          <ul className="my-6">
            <ProListItem>Provisioning Servers</ProListItem>
            <ProListItem>What is Kubernetes?</ProListItem>
            <ProListItem>Dealing with Webpack</ProListItem>
            <ProListItem>Cross-browser issues</ProListItem>
          </ul>
        </section>
      </main>
    </>
  );
}
