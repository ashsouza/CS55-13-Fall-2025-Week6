// Import the custom Layout component for consistent page structure.
import Layout from '../../components/layout';
// Import data fetching functions from the local posts library.
import { getAllPostIds, getPostData } from '../../lib/posts-firebase';
// Import the Head component from Next.js to manage the document head.
import Head from 'next/head';
// Import a custom Date component to format the post's publication date.
import Date from '../../components/date';
// Import a CSS module for utility styles.
import utilStyles from '../../styles/utils.module.css';
import Image from 'next/image'

// This function fetches the data for each posts at build time
// receives `params` containing the post's ID.
export async function getStaticProps({ params }) {
  // Add the "await" keyword like this:
  const postData = await getPostData(params.id);
 
  return {
    props: {
      postData,
    },
  };
}
 
export async function getStaticPaths() {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
 
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1><br />
        <h2 className={utilStyles.headingSml}>{postData.contentImage}</h2><br />
        <Image className={utilStyles.postImage}
                        src={postData.featured_image}
                        width={200}
                        height={100}
                        alt="image"
                        style={{
                          width: '50%',
                          height: 'auto',
                        }}
                      />
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div className={utilStyles.headingMd} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
                <button className={utilStyles.postButton}>
        {postData.contentTag}
        </button>
      </article>
    </Layout>
  );
}