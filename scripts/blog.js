const blogsContainer = document.querySelector(".blog-container");
const openSinglePost = (dataUrl) => {
    if(dataUrl){
        window.location.href = dataUrl;
    }
};

blogsContainer.addEventListener("click", function(event){
    const clickedPost = event.target.closest(".blogpost-container-single")
    if (clickedPost) {
        const blogDetailsUrl = clickedPost.getAttribute("data-url");
        openSinglePost(blogDetailsUrl);
    }
})

const showMoreBtn = document.getElementById("showmore-button");
let blogPostsContainer = document.querySelector(".blog-container");
let numberOfPosts = 5;

// Fetch API

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const searchQuery = params.get("search");

function checkQuery(post) {
    return post.title.rendered.toLowerCase().includes(searchQuery.toLowerCase());
};



const baseUrl ="http://localhost/travelblog/wp-json/wp/v2/posts?_embed";

let postsData = [];

async function getPosts(url) {
    try{
    const response = await fetch(url);
    postsData = await response.json();
    if(searchQuery){
        postsData = postsData.filter(checkQuery);
    }
    }
    catch(error) {
        console.error("error", error);
    }
    finally {
        if(postsData.length > 0){
        showPosts(postsData);
    }else {
        blogPostsContainer.innerHTML = "<p>No match on your search results</p>"
    }
    }
};



function showPosts() {
    blogPostsContainer.innerHTML = "";
    const showBlogPosts = postsData;

    for(let i = 0; i < numberOfPosts; i++){

        if(i < showBlogPosts.length){
        let post = showBlogPosts[i];
        let imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/media/placeholderblogpost.jpg";
        const date = new Date(post.date_gmt);
        const dateOnly = date.toISOString().split('T')[0];
        
        showMoreBtn.style.display = "block";

        blogPostsContainer.innerHTML += `
        <div class="blogpost-container-single" style="background-image: url(${imageUrl});" data-url="blogspecific.html?id=${post.id}">
            <div>
                <h3>${post.title.rendered}</h3>
                <p>${dateOnly}</p>
            </div>
            <div>
                <a>Click to see more!</a>
            </div>
        </div>
        `
    }else {
        showMoreBtn.style.display = "none";
    }};
};

function loadMorePosts() {
    numberOfPosts += 5;
    showPosts()
}

showMoreBtn.addEventListener("click", loadMorePosts);

getPosts(baseUrl);

