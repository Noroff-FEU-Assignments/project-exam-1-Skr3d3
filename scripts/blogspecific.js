const title = document.querySelector("title");

//params

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const blogPostContainer = document.querySelector(".blogspecific-section");

const allImages = document.querySelectorAll("img");

const elementOpacity = (opacity) => {
    header.style.opacity = `${opacity}%`;
    commentsContainer.style.opacity = `${opacity}%`;
    formContainer.style.opacity = `${opacity}%`;
}

// Image lightbox

function addImagesClass(){
    document.querySelectorAll(".images-container img").forEach(function(containerImage){
        containerImage.classList.add("wordpress-images");
    })
}

blogPostContainer.addEventListener("click", function(event){
    if(event.target.closest("img")){
        event.target.classList.add("lightbox-image");
        body.classList.add("lightbox-bg");
        document.querySelectorAll(".images-container img").forEach(function(containerImage){
            containerImage.classList.remove("wordpress-images");
        })
        
        document.querySelectorAll("img").forEach(function(image){
        if(!image.classList.contains("lightbox-image") && !image.classList.contains("logo")){
        image.style.display = "none";
        }})
        document.querySelectorAll(".images-container img").forEach(function(containerImage){
            containerImage.style.height = "600px";
            })
        }
    footer.style.display = "none";
    elementOpacity(60)
    }
);

document.addEventListener("click", function(event){
    if(event.target.classList.contains("lightbox-image")){
}else {
    document.querySelectorAll("img").forEach(function(image){
        image.classList.remove("lightbox-image");
        image.style.display = "inherit";
        document.querySelectorAll(".images-container img").forEach(function(containerImage){
            containerImage.classList.add("wordpress-images");
        })
    })
    body.classList.remove("lightbox-bg");
    footer.style.display = "flex";
    elementOpacity(100)
    
}});



// Fetch API

const blogPostUrl =`https://travelblog.skr3d3.com/wp-json/wp/v2/posts/${id}`;

async function getPosts(url) {
    try{
    const response = await fetch(url);
    const postData = await response.json();

    if(postData){
            let post = postData;
            const date = new Date(post.date_gmt);
            const dateOnly = date.toISOString().split('T')[0];

            // Sort out images only from rendered content

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = post.content.rendered;
            const imageElements = tempDiv.querySelectorAll("img");
            const textElements = tempDiv.querySelector("p");
            let textContainer = textElements.outerHTML;
            let imagesContainer = "";


            for(let i = 0; i < imageElements.length; i++) {
                const image = imageElements[i];
                if(image.classList.contains("avatar")){
                    continue;
                } else {
                imagesContainer += image.outerHTML;
                };
            };

            title.innerHTML = `${post.title.rendered}`
            
    
            blogPostContainer.innerHTML += `
            <h1>${post.title.rendered}</h1>
            <p>${dateOnly}</p>
            <div class="blog-specific-container">
            <div class="images-container">
            ${imagesContainer}
            </div>
            <p>${textContainer}</p>
            </div>
            `
        } else {
            console.log("Error 404. Post not found.")
        }}
    catch(error) {
        console.error("error", error);
    }
    finally {
    addImagesClass()
    }
};
getPosts(blogPostUrl);