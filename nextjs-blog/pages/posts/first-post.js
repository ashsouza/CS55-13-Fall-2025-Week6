// import Head component from next.js -- this manages HTML document head tags
import Head from 'next/head'; 
// import Layout component to wrap and structure the page content
import Layout from '../../components/layout'; 
// import a CSS module styles -- malkes it so that component-specific styling has no conflict
import utilStyles from '../../styles/utils.module.css'; 

// define a default export for the FirstPost page component
export default function FirstPost() {
  // this returns the JSX structure of the page
  // set the class name to edit the CSS for the heading below
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1 className={`${utilStyles.headingMd} ${utilStyles.textCenter}`}>Hello! This is my first post.</h1>
    </Layout>
  );
}