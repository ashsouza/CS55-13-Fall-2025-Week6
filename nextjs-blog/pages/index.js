import Link from 'next/link';
import Date from '../components/date';

// Import the Head component from Next.js to manage HTML document head.
import Head from 'next/head'; 
// Import the custom Layout component and a constant `siteTitle` for page structure and metadata.
import Layout, { siteTitle } from '../components/layout'; 
// Import a CSS module for utility styles.
import utilStyles from '../styles/utils.module.css'; 
// Import a function to get sorted post data from the local data source.
import { getSortedPostsData } from '../lib/posts';
// Import a function to get sorted post data from the local data source.
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

// Define a default export for the Home page component.
export default function Home({ allPostsData }) {
  // The function returns the JSX structure for the home page.
  return (
    // Wrap the page content in the Layout component, passing `home` as a prop.
    // to apply home-specific styling.
    <Layout home> 

      <Head>
        <title>Ashley's Page</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello, my name is Ashley. I am a student web developer with a love for birds.</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
          <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
            <Date dateString={date} />
              </small>
          </li>
          ))}
        </ul>
      </section>

    </Layout>
  );
}