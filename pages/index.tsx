import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

import avatar from '../public/avatar.jpg';
import video from '../public/video.png';
import Subscribe from '../components/Subscribe';

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

const VideoCard = ({ title, length, href, children }) => (
  <Link href={href}>
    <a
      href={href}
      className=" flex flex-col md:flex-row no-underline hover:scale-[1.02] transition"
    >
      <div className="flex mr-8 shadow-lg w-[230px] max-w-[230px] md:w-full">
        <Image
          className="rounded-lg"
          width={230}
          height={150}
          src={video}
          placeholder="blur"
          objectFit="cover"
        />
      </div>
      <div className="w-full">
        <h3 className="tracking-tight font-medium mb-0 mt-4 md:mt-0 text-lg">
          {title}
        </h3>
        <p className="text-gray-600 mb-2 text-xs">{length}</p>
        <p className="text-gray-700 mb-2 text-sm max-w-[300px]">{children}</p>
      </div>
    </a>
  </Link>
);

export default function Index() {
  const meta = {
    title: 'React 2025 – Build applications from the future, today.',
    description: `Learn how to build and deploy a modern React application using the most popular open-source software.`,
    image: 'https://react2025.com/og.png'
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`https://react2025.com`} />
        <link rel="canonical" href={`https://react2025.com`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Lee Robinson" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@leeerob" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>
      <header className="bg-gray-50">
        <div className="h-4 w-full bg-gradient-to-r from-[#F7F322] via-[#09DB1F] to-[#0AF5F4]" />
        <nav className="max-w-lg px-8 py-4 md:py-8 mx-auto my-4 md:my-8 flex justify-between">
          <Link href="/">
            <a>
              <img className="h-8 w-8" alt="React 2025" src="/logo.svg" />
            </a>
          </Link>
          <a className="font-medium" href="https://docs.react2025.com">
            Documentation
          </a>
        </nav>
        <section className="max-w-md p-8 mx-auto pb-8 md:pb-32">
          <h1 className="mb-4 text-4xl md:text-5xl font-bold tracking-tight !leading-[1.25]">
            Start developing
            <div className="block">
              websites
              <span className="inline bg-[#0AF5F4] mx-2">like it's 2025.</span>
            </div>
          </h1>
          <p className="text-gray-700 text-lg mb-4">
            Build and deploy a modern SaaS application using the most popular
            open-source software.
          </p>
          <a
            type="button"
            href="#course-overview"
            className="text-white px-4 py-2 rounded font-bold bg-gray-900 hover:bg-gray-700 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition duration-150 ease-in-out"
          >
            Watch Now →
          </a>
        </section>
      </header>
      <main>
        <section className="m-auto max-w-md mt-8 px-8 py-4 md:py-12">
          <h2 className="mb-4 text-xl md:text-2xl font-bold tracking-tight">
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
          <ul className="my-6 space-y-2">
            <ConListItem>Provisioning Servers</ConListItem>
            <ConListItem>What is Kubernetes?</ConListItem>
            <ConListItem>Dealing with Webpack</ConListItem>
            <ConListItem>Cross-browser issues</ConListItem>
          </ul>
          <p className="text-gray-700 my-8">
            And more time doing the things you <strong>love.</strong>
          </p>
          <ul className="my-6 space-y-2">
            <ProListItem>Building your product</ProListItem>
            <ProListItem>Deploying with ease</ProListItem>
            <ProListItem>Making your customers happy</ProListItem>
            <ProListItem>Working with modern tools</ProListItem>
          </ul>
        </section>
        <span className="flex m-auto max-w-md bg-gray-100 h-[1px] w-full" />
        <section className="m-auto max-w-md mt-8 px-8 py-4 md:py-12">
          <h2 className="mb-4 text-xl md:text-2xl font-bold tracking-tight">
            Transform front-end to full-stack.
          </h2>
          <p className="text-gray-700 mb-4">
            Are you frustrated with how long it takes to go from idea to
            production? As a front-end developer, I wanted to{' '}
            <strong>bring my ideas to life</strong>. Not just the front-end, but
            the full stack.
          </p>
          <p className="text-gray-700">
            Then, I discovered the optimal workflow for front-end developers.
          </p>
          <ol className="list-decimal my-6">
            <li className="list-inside mb-2 font-medium text-lg">
              Build dynamic applications that become static.
            </li>
            <li className="list-inside mb-2 font-medium text-lg">
              Push code to a repository with Git.
            </li>
            <li className="list-inside mb-2 font-medium text-lg">
              Deploy instantly to a global Edge Network.
            </li>
          </ol>
          <p className="mt-16 mb-6 italic text-lg text-gray-800">
            "React 2025 helped me{' '}
            <strong>leave my front-end comfort zone</strong> and expand into the
            full stack." –– Joe Bell
          </p>
        </section>
        <span className="flex m-auto max-w-md bg-gray-100 h-[1px] w-full" />
        <section className="m-auto max-w-md mt-8 px-8 py-4 md:py-12">
          <h2 className="mb-4 text-xl md:text-2xl font-bold tracking-tight">
            Not your typical course.
          </h2>
          <p className="text-gray-700 mb-4">
            Are you tired of courses that don't show real-world applications? In
            my last course, I showed how to build an application with a
            database, authentication, and more. But I never launched it.
          </p>
          <p className="text-gray-700">
            This course will show the journey from zero lines of code to
            production for a real SaaS app. This isn't another example – it's a
            real product. Students have used React 2025 to{' '}
            <strong>create their own SaaS apps</strong> and become
            entrepreneurs.
          </p>
          <ul className="my-8 space-y-2">
            <ProListItem>Next.js / React</ProListItem>
            <ProListItem>Firebase Authentication / Firestore</ProListItem>
            <ProListItem>Subscription payments with Stripe</ProListItem>
            <ProListItem>Deployed serverless to Vercel</ProListItem>
          </ul>
        </section>
        <span className="flex m-auto max-w-md bg-gray-100 h-[1px] w-full" />
        <section className="m-auto max-w-md mt-8 px-8 py-4 md:py-12">
          <h2 className="mb-4 text-xl md:text-2xl font-bold tracking-tight">
            What we're building.
          </h2>
          <p className="text-gray-700">
            In this course, we'll build Fast Feedback – the easiest way to add
            reviews and comments to your site. You can try it out{' '}
            <a href="https://fastfeedback.io/" className="font-bold underline">
              here.
            </a>
          </p>
          <div className="mt-8 mb-8 w-full">
            <iframe
              frameBorder="0"
              title="Fast Feedback Demo"
              src="https://www.loom.com/embed/c086b098bccc4be5a7be297185ce102e"
              allowFullScreen
              className="w-full h-[300px]"
            />
          </div>
        </section>
        <span className="flex m-auto max-w-md bg-gray-100 h-[1px] w-full" />
        <section
          id="course-overview"
          className="m-auto max-w-md mt-8 px-8 py-4 md:py-12"
        >
          <h2 className="mb-4 text-xl md:text-2xl font-bold tracking-tight">
            Course Overview
          </h2>
          <p className="text-gray-700 mb-16">
            Join over <strong>100,000 students</strong> who've taken React 2025.
            All videos are <strong>100% free</strong>. If you'd like to support
            me, you can subscribe to my YouTube channel for more videos.
          </p>
          <div className="my-8 space-y-8">
            <VideoCard
              title="Welcome to React 2025"
              length="1:17"
              href="https://www.youtube.com/watch?v=JCOPVq2AYXc&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=1"
            >
              Get excited! The next 15 live streams will teach you how to build
              a real SaaS application.
            </VideoCard>
            <VideoCard
              title="Introduction to React 2025"
              length="1:02:45"
              href="https://youtu.be/MxR5I5_hOKk?list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&t=155&index=2"
            >
              An introduction to the course and an explanation of what we'll
              build.
            </VideoCard>
            <VideoCard
              title="Firestore, Chakra UI, Absolute Imports"
              length="54:22"
              href="https://www.youtube.com/watch?v=AGl52moyISU&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=3"
            >
              Learn about best practices with Next.js data fetching and
              configure Firestore and Chakra UI.
            </VideoCard>
            <VideoCard
              title="Designing & Building the Dashboard"
              length="1:08:30"
              href="https://www.youtube.com/watch?v=3g6-v3_BNbM&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=4"
            >
              Convert Figma designs into real React code and build a dashboard
              page.
            </VideoCard>
            <VideoCard
              title="Firebase Admin with Next.js + SWR"
              length="1:13:45"
              href="https://www.youtube.com/watch?v=u8iv_yhSRI8&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=5"
            >
              Configure Firebase server-side and use API routes + SWR to fetch
              and mutate data.
            </VideoCard>
            <VideoCard
              title="Creating Feedback Pages"
              length="51:35"
              href="https://www.youtube.com/watch?v=1nRWL5ljOqU&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=6"
            >
              Fetch data from Firestore with getStaticProps / getStaticPaths and
              save user feedback with a form.
            </VideoCard>
            <VideoCard
              title="Authentication on API Routes (Firebase JWT)"
              length="45:45"
              href="https://www.youtube.com/watch?v=OndBtUUD8XE&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=7"
            >
              Protect Next.js API routes and redirect to the dashboard. We also
              learn about Incremental Static Regeneration.
            </VideoCard>
            <VideoCard
              title="User Feedback Page + Google Sign In"
              length="51:40"
              href="https://www.youtube.com/watch?v=Fvoi6g52bk0&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=8"
            >
              Learn how to reuse layouts and styles, plus add Sign In with
              Google using Firebase Authentication.
            </VideoCard>
            <VideoCard
              title="Squashing bugs, integration tests, and logging"
              length="55:45"
              href="https://www.youtube.com/watch?v=3YTv_MhmcMI&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=9"
            >
              Set up an integration test on PR runs with Checkly / Puppeteer and
              persist logs to to Logflare.
            </VideoCard>
            <VideoCard
              title="Subscription Payments with Stripe"
              length="1:46:37"
              href="https://www.youtube.com/watch?v=d9HGdw8zwvc&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=10"
            >
              Connect to Stripe to allow users to checkout and manage their
              subscriptions.
            </VideoCard>
            <VideoCard
              title="Managing Site Feedback"
              length="1:12:39"
              href="https://www.youtube.com/watch?v=F4T1ym2QNmE&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=12"
            >
              Creating, updating, and deleting feedback in Firebase through the
              user dashboard.
            </VideoCard>
            <VideoCard
              title="Embed Iframe + Edit/Delete Site"
              length="1:26:20"
              href="https://www.youtube.com/watch?v=Mmt2IbKzIu4&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=13"
            >
              Manage a site's settings through a Modal and mutate your cache
              with SWR.
            </VideoCard>
            <VideoCard
              title="Going to Production + Testing With Checkly"
              length="1:09:20"
              href="https://www.youtube.com/watch?v=huQi7Gnj7zo&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=14"
            >
              Launch the product and write a login end-to-end test with Checkly
              and Puppeteer.
            </VideoCard>
            <VideoCard
              title="Adding MDX"
              length="42:40"
              href="https://www.youtube.com/watch?v=pQDh_82-MXs&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=15"
            >
              Use MDX to create the terms and privacy policy pages for the
              application.
            </VideoCard>
            <VideoCard
              title="Launching Your Product & Conclusion"
              length="6:41"
              href="https://www.youtube.com/watch?v=3Y_Kl00mcvw&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=16"
            >
              That's a wrap! Some final thoughts on how to launch your product.
            </VideoCard>
          </div>
        </section>
        <span className="flex m-auto max-w-md bg-gray-100 h-[1px] w-full" />
        <section className="m-auto max-w-md mt-4 mb-16 px-8 py-4 md:py-12">
          <Subscribe />
          <div className="flex items-center mt-6">
            <div className="mr-4">
              <Image
                alt="Lee Robinson"
                src={avatar}
                placeholder="blur"
                width={72}
                height={72}
                className="rounded-full"
              />
            </div>
            <div className="w-full">
              <p className="text-gray-700 mt-4 text-sm md:text-lg">
                <strong>I'm Lee Robinson</strong> –– developer, writer, and the
                creator of Mastering Next.js and React 2025.
              </p>
              <a
                href="https://leerob.io"
                className="mt-2 no-underline italic transition border-b-2 border-[#0af5f4] hover:border-[#09DB1F] text-sm md:text-base"
              >
                more about me &#187;
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
