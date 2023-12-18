//params

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const blogPostContainer = document.querySelector(".blogspecific-section")


// Fetch API

const blogPostUrl =`https://blog.skr3d3.com/wp-json/wp/v2/posts?_embed/&id=${id}`;

async function getPosts(url) {
    try{
    const response = await fetch(url);
    postData = await response.json();

    if(postData && postData.length > 0){
            let post = postData[0];
            let imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/media/placeholderblogpost.jpg";
            const date = new Date(post.date_gmt);
            const dateOnly = date.toISOString().split('T')[0];
    
            blogPostContainer.innerHTML += `
            <h1>${post.title.rendered}</h1>
            <p>${dateOnly}</p>
            <div class="blog-specific-container">
            <img src="${imageUrl}" width="100px">
            </div>
            `
        } else {
            console.log("Error 404. Post not found.")
        }}
    catch(error) {
        console.error("error", error);
    }
    finally {
    }
};
getPosts(blogPostUrl)