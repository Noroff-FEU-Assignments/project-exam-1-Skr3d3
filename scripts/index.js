
// Fetch API

const baseUrl ="https://blog.skr3d3.com/wp-json/wp/v2/posts";

let postsData = [];

async function getPosts(url) {
    try{
    const response = await fetch(url);
    postsData = await response.json();
    }
    catch(error) {
        console.error("error", error);
    }
    finally {
        filterStickyPosts(postsData);
    }
};

filterStickyPosts(postsData);

function filterStickyPosts(posts) {
    const featuredContainer = document.querySelector(".featured-container")
    const stickyPosts = postsData.filter(post => post.sticky);

    stickyPosts.forEach(function(post){
        featuredContainer.innerHTML += `<h3>${post.title.rendered}</h3>`
    });


};

getPosts(baseUrl);

