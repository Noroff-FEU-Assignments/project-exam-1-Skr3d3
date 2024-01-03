

const featuredSection = document.getElementById("featured-section")
const featuredContainer = document.querySelector(".featured-container");
const recentContainer = document.querySelector(".recent-container");
const carouselContainer = document.querySelectorAll(".carousel-container");
const carouselSlidesContainer = document.querySelectorAll(".carousel");

document.getElementById("enterblog-button").addEventListener("click", function() {
    window.location.href = "/blog.html";
});

const disabledBtn = document.querySelector(".disabled");

disabledBtn.addEventListener("click", function(){
    disabledAnimation(disabledBtn);
    disabledBtn.innerHTML = "TEMPORARY DISABLED"
});

function message(title, error) {
    return `<div class="error-message"><h4>${title}</h4><p>${error.message}</p></div>`;
};


// Carousel

function carousel(event) {

    let blogSlideIndex = 0;

function updateSlidePosition() {
    if (blogSlideIndex < 0) {
        blogSlideIndex = 0;
    } else if (blogSlideIndex >= event.children.length){
        blogSlideIndex = event.children.length - 1;
    }  
    event.style.transform = `translateX(${-blogSlideIndex * 100}%)`
};

event.addEventListener("click", function(event) {
    const clickedElement = event.target;

if(clickedElement.closest(".prev")) {
    blogSlideIndex--;
    updateSlidePosition();
    
}
else if (clickedElement.closest(".next")){
    blogSlideIndex++;
    updateSlidePosition();
}
});};

// Fetch API

const baseUrl ="http://travelblog.skr3d3.com/wp-json/wp/v2/posts?_embed";

let postsData = [];

console.log(postsData)

async function getPosts(url) {
    try{
        loadingSplash("flex");
        const response = await fetch(url);
        if(!response.ok) throw new Error("Bad response from the server")
        postsData = await response.json();
    }
    catch(error) {
        console.error(error);
        featuredContainer.innerHTML = message("Error", error)
        recentContainer.innerHTML = message("Error", error)
    }
    finally {
        loadingSplash("none");
        filterStickyPosts(postsData);
        filterRecentPosts(postsData);
    }
};


getPosts(baseUrl);



function filterStickyPosts() {
    const stickyPosts = postsData.filter(post => post.sticky);

    if(stickyPosts.length <= 0){
        featuredSection.style.display = "none";
    }

    stickyPosts.forEach(function(post){
        let imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/media/placeholderblogpost.jpg";
        const date = new Date(post.date_gmt);
        const dateOnly = date.toISOString().split('T')[0];
        featuredContainer.innerHTML += `
        <div class="blogpost-container-single" style="background-image: url(${imageUrl});">
            <div>
                <h3>${post.title.rendered}</h3>
                <p>${dateOnly}</p>
            </div>
            <div>
                <a>Click to see all posts!</a>
            </div>
            <button class="prev"><i class="fa-solid fa-arrow-left"></i></button>
            <button class="next"><i class="fa-solid fa-arrow-right"></i></button>
        </div>
        `
    });

    
carousel(featuredContainer);


};


function filterRecentPosts(posts) {
    
    for(let i = 0; i < 3; i++){
        const post = posts[i];
        if(!post){
            console.warn("Error with post", [i]);
            continue;
        }
        
        let imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/media/placeholderblogpost.jpg";
        const date = new Date(post.date_gmt);
        const dateOnly = date.toISOString().split('T')[0];
        recentContainer.innerHTML += `
        <div class="blogpost-container-single" style="background-image: url(${imageUrl});">
            <div>
                <h3>${post.title.rendered}</h3>
                <p>${dateOnly}</p>
            </div>
            <div>
                <a>Click to see all posts!</a>
            </div>
            <button class="prev"><i class="fa-solid fa-arrow-left"></i></button>
            <button class="next"><i class="fa-solid fa-arrow-right"></i></button>
        </div>
        `
        console.log(imageUrl)
    }

carousel(recentContainer);
};

carouselSlidesContainer.forEach(function(slide){
    
slide.addEventListener("click", function(event){
    if (event.target.closest("button")){
        return;
    }
    if (slide.closest(".carousel")){
        window.location.href = "/blog.html"
    }
});
});