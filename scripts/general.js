// Variables

const logo = document.querySelector(".logo");
const body = document.body;
const footer = document.querySelector("footer");
const header = document.querySelector("header");

// Scroll animation


const observer = new IntersectionObserver(function(events) {
    events.forEach(function(event){
        console.log(event);
        if (event.isIntersecting) {
            event.target.classList.add("show");
        } else {
            event.target.classList.remove("show");
        }
    })
});
document.addEventListener("DOMContentLoaded", function(){
    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach(function(element){
    observer.observe(element);
});


//Searchbar

const windowMin1024 = window.matchMedia("(min-width: 1024px)");

function showSearchBar(mediaQuery) {
    if(mediaQuery.matches) {
    searchBar.style.display = "block";
    document.removeEventListener("click", searchBarOutsideClick);
    } else {
    searchBar.style.display = "none";
    document.addEventListener("click", searchBarOutsideClick);
    }
};

showSearchBar(windowMin1024);

windowMin1024.addEventListener("change", showSearchBar);
})


const searchBarIcon = document.getElementById("searchbar-label");
const searchBar = document.getElementById("searchbar");

searchBarIcon.addEventListener("click", function(){
    if(searchBar.style.display !== "block"){
    searchBar.style.display = "block";
}else{
    window.location.href = `/blogspecific.html?search=${searchBar.value}`
}
})
function searchBarOutsideClick(event) {
    if (!searchBar.contains(event.target) && event.target !== searchBarIcon && searchBar.style.display === "block") {
        searchBar.style.display = "none";
    }};

searchBar.addEventListener("keydown", function(event){
    if(event.keyCode === 13){
    window.location.href = `/blogspecific.html?search=${searchBar.value}`
}});

document.addEventListener("click", function(){
    navOutsideClick(event);
});

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


hamburgerIcon.addEventListener("keydown", function(event){
    if(13 == event.keyCode) {   
        toggleHamburgerMenu(); 
    }
});