//params

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const blogPostContainer = document.querySelector(".blogspecific-section")


// Fetch API

const blogPostUrl =`http://localhost/travelblog/wp-json/wp/v2/posts/${id}`;

async function getPosts(url) {
    try{
    const response = await fetch(url);
    const postData = await response.json();

    if(postData){
            let post = postData;
            let featuredImageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/media/placeholderblogpost.jpg";
            const date = new Date(post.date_gmt);
            const dateOnly = date.toISOString().split('T')[0];

            // Sort out images only from rendered content

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = post.content.rendered;

            const imageElements = tempDiv.querySelectorAll("img");

            console.log(imageElements);

            let imagesContainer = "";

            for(let i = 0; i < imageElements.length - 1; i++) {
                imagesContainer += imageElements[i].outerHTML;
            };
    
            blogPostContainer.innerHTML += `
            <h1>${post.title.rendered}</h1>
            <p>${dateOnly}</p>
            <div class="blog-specific-container">
            <div class="images-container">
            ${imagesContainer}
            </div>
            <p>${post.excerpt.rendered}</p>
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