// import initialized Firestore database
import { db } from './firebase';
// import FGirestore functions for querying
import { collection, getDocs, query, where, documentId } from 'firebase/firestore'; 
// asyncronously fetches all post data, then sorts and returns an array
export async function getSortedPostsData() {
    // get a reference to the 'posts' collection in Firestone
    const myCollectionRef = collection(db, "posts");
    // query to get all documents (posts) from the collection
    const querySnapshot = await getDocs(myCollectionRef);
    // map docs to a JavaScript array
    // each object includes the document ID
    const jsonObj = querySnapshot.docs.map(doc => ({ id: doc.id,  ...doc.data() }));

    // sort the array alphabetically per 'title' property
    jsonObj.sort(function (a, b) {
    // localeCompare providing a comparison for strings
        return a.title.localeCompare(b.title);
    });
    // return reconfigured array organized by id converted to a string
    return jsonObj.map(item => {
        return {
            id: item.id.toString(),
            title: item.title,
            date: item.date,
            contentTag: item.contentTag
        }
    });
}

// asynchronously fetches all post IDs required by Next.js's `getStaticPaths`
export async function getAllPostIds() {
    // get a reference to the posts collection
     const myCollectionRef = collection(db, "posts");
     //execute a query for all docs
    const querySnapshot = await getDocs(myCollectionRef);
    // map the results to an array containing only the document ID
    const jsonObj = querySnapshot.docs.map(doc => ({ id: doc.id }));

    // reformat the array into the params structure required by next.js
     return jsonObj.map(item => {
        return {
            params: {
                id: item.id.toString()
            }
        }
    });

}

// asynchronously fetches the data for a single post by ID
export async function getPostData(id) {
    // reference to the 'posts' collection
    const myCollectionRef = collection(db, "posts");
    // create a query to search the collection
    const searchQuery = query( 
        myCollectionRef,
        where(
            documentId(),
            "==",
            id
        )
    );
    // execute the search query
    const querySnapshot = await getDocs(searchQuery);
    // map the results to a javascript object
    const jsonObj = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    if (jsonObj.length === 0 ) {
        // return 'Not found' object if the post ID doesn't exist
        return {
            id: id, 
            title: 'Not found',
            date: '',
            contentHtml: 'Not found',
            contentTag: 'Not found',
            contentImage: 'Not found',
        }
    } else {
        // return the first found post object
        return jsonObj[0];
    }

}
