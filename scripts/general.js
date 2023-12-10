// Variables

const logo = document.querySelector(".logo")

//Misc

logo.addEventListener("click", function(){
    window.location = "../";
});
logo.addEventListener("mouseover", function(){
    logo.style.cursor = "pointer";
});

//Hambuger Menu

const hamburgerIcon = document.getElementById("hamburger-menu");
const navContainer = document.querySelector("nav");

function toggleHamburgerMenu() {
    if(navContainer.style.display === "flex") {
        navContainer.style.display = "none";
    }
    else {
        navContainer.style.display = "flex";
    };
};

function navOutsideClick(event) {
    if (!navContainer.contains(event.target) && event.target !== hamburgerIcon && navContainer.style.display === "flex") {
        navContainer.style.display = "none";
    }
};

hamburgerIcon.addEventListener("click", toggleHamburgerMenu);
document.addEventListener("click", navOutsideClick);


