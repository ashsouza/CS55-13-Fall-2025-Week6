import fs from 'fs';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'data');

export function getSortedPostsData() {
    // retreive file path of posts
    const filePath = path.join(dataDirectory, 'posts.json');
    // read all the data in the file
    const jsonString = fs.readFileSync(filePath, 'utf-8');
    // parse into obj value
    const jsonObject = JSON.parse(jsonString);
    // sort data by title properties
    jsonObject.sort(function (a, b) {
        return a.title.localeCompare(b.title);
    });
    // return reconfigured array organized by id converted to a string
    return jsonObject.map(item => {
        return {
            id: item.id.toString(),
            title: item.title,
            date: item.date,
            featured_image: item.featured_image
        }
    });
}

export function getAllPostIds() {
    // file path of posts
    const filePath = path.join(dataDirectory, 'posts.json');
    // read data in the file
    const jsonString = fs.readFileSync(filePath, 'utf-8');
    // parse into obj value
    const jsonObject = JSON.parse(jsonString);
    // Return reconfigured array organized by id converted to a string
    //console.log(jsonObject);
    return jsonObject.map(item => {
        return {
            params: {
                id: item.id.toString()
            }
        }
    });
}

export async function getPostData(id) {
    // file path of posts
    const filePath = path.join(dataDirectory, 'posts.json');
    // read the data in the file
    const jsonString = fs.readFileSync(filePath, 'utf-8');
    // parse into obj value
    const jsonObject = JSON.parse(jsonString);
    // find the signle obj value that relates to the id value with array obj
    const objectReturned = jsonObject.filter(object => {
        return object.id.toString() === id;
    });
    if (objectReturned.length === 0) {
        return {
            "id": id,
            "title": 'Not found',
            "date": '',
            "contentHtml": 'Not found',
            "featured_image": 'Not found',
        }
    } else {
        return objectReturned[0];
    }
}