// Variables

const logo = document.querySelector(".logo");
const body = document.body;
const footer = document.querySelector("footer");
const header = document.querySelector("header");

//Misc

const disabledAnimation = (event) => {
    event.classList.add("wiggleanimation"); 
    setTimeout(function(){
        event.classList.remove("wiggleanimation")
     }, 500);}

logo.addEventListener("click", function(){
    window.location = "../";
});
logo.addEventListener("mouseover", function(){
    logo.style.cursor = "pointer";
});

// Loading splash

const loadingAnimation = document.querySelectorAll(".loading-container");

const loadingSplash = (test) => {
loadingAnimation.forEach(function(loading){
    loading.style.display = test;
})}

//Searchbar

const searchBarIcon = document.getElementById("searchbar-label");
const searchBar = document.getElementById("searchbar");

searchBarIcon.addEventListener("click", function(){
    if(searchBar.style.display !== "block"){
    searchBar.style.display = "block";
}else{
    window.location.href = `/blog.html?search=${searchBar.value}`
}
})
function searchBarOutsideClick(event) {
    if (!searchBar.contains(event.target) && event.target !== searchBarIcon && searchBar.style.display === "block") {
        searchBar.style.display = "none";
    }};

searchBar.addEventListener("keydown", function(event){
    if(event.keyCode === 13){
    window.location.href = `/blog.html?search=${searchBar.value}`
}});


//Hambuger Menu

const hamburgerIcon = document.getElementById("hamburger-menu");
const navContainer = document.querySelector("nav");

function toggleHamburgerMenu() {
    if(navContainer.style.display === "flex") {
        navContainer.style.display = "none";
        hamburgerIcon.classList.remove("fa-bars-staggered");
        hamburgerIcon.classList.add("fa-bars");
    }
    else {
        navContainer.style.display = "flex";
        hamburgerIcon.classList.remove("fa-bars");
        hamburgerIcon.classList.add("fa-bars-staggered");
    };
};

function navOutsideClick(event) {
    if (!navContainer.contains(event.target) && event.target !== hamburgerIcon && navContainer.style.display === "flex") {
        navContainer.style.display = "none";
        hamburgerIcon.classList.remove("fa-bars-staggered");
        hamburgerIcon.classList.add("fa-bars");
    }};

hamburgerIcon.addEventListener("mouseover", function(){
    if(hamburgerIcon.classList.contains("fa-bars-staggered")){
    hamburgerIcon.classList.remove("fa-beat");
    } else{
        hamburgerIcon.classList.add("fa-beat");
    }
});
hamburgerIcon.addEventListener("mouseout", function(){
    hamburgerIcon.classList.remove("fa-beat");
});

hamburgerIcon.addEventListener("click", toggleHamburgerMenu);
document.addEventListener("click", function(){
    navOutsideClick(event);
    searchBarOutsideClick(event);
});

hamburgerIcon.addEventListener("keydown", function(e){
    if(13 == e.keyCode) {   
        toggleHamburgerMenu(); 
    }
});