
// Fetch API

const baseUrl ="https://blog.skr3d3.com/wp-json/wp/v2/posts?_embed";

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
        showAllPosts(postsData);
    }
};



showAllPosts(postsData);

function showAllPosts(posts) {
    let blogPostsContainer = document.getElementById("blog");
    const showBlogPosts = postsData;


    showBlogPosts.forEach(function(post){

        let imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/media/placeholderblogpost.jpg";
        const date = new Date(post.date_gmt);
        const dateOnly = date.toISOString().split('T')[0];

        blogPostsContainer.innerHTML += `
        <div style="background-image: url(${imageUrl});">
        <h3>${post.title.rendered}</h3>
        <p>${dateOnly}</p>
        <a>Click to see more!</a>
        </div>
        `
    });


};

getPosts(baseUrl);

