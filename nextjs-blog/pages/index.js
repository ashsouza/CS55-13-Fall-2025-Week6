// Import the Head component from Next.js to manage HTML document head.
import Head from 'next/head'; 
// Import the custom Layout component and a constant `siteTitle` for page structure and metadata.
import Layout, { siteTitle } from '../components/layout'; 
// Import a CSS module for utility styles.
import utilStyles from '../styles/utils.module.css'; 
 
// Define a default export for the Home page component.
export default function Home() {
  // The function returns the JSX structure for the home page.
  return (
    // Wrap the page content in the Layout component, passing `home` as a prop.
    // set the title and class name for the elements below to modify CSS
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
    </Layout>
  );
}