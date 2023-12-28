const formName = document.getElementById("name");
const formEmail = document.getElementById("email");
const formSubject = document.getElementById("subject");
const formText = document.getElementById("message");

const formNameError = document.getElementById("nameerror");
const formEmailError = document.getElementById("emailerror");
const formSubjectError = document.getElementById("subjecterror");
const formTextError = document.getElementById("texterror");

const formButton = document.querySelector("button");
const submitMessage = document.getElementById("submitmessage");

const contactForm = document.getElementById("contactform");



function isNameValid(name) {
    const pattern = /^[A-Za-z]+(?: [A-Za-z]+)? [A-Za-z]+$/;
    return pattern.test(name)
};

function isEmailValid(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email)
};

function checkLength(value, len) {
    if(value.trim().length >= len) {
        return true;
    } else {
        return false;
    }
};

function enableButton() {
    if(isNameValid(formName.value) && isEmailValid(formEmail.value) && formSubject.value && checkLength(formText.value, 10)) {
        formButton.classList.remove("disabled");
    } else {
        submitMessage.innerHTML = "";
        formButton.classList.add("disabled");
    }
};

const displayNameError = () => {
    if(isNameValid(formName.value)){
        formNameError.style.display = "none";
    } else {
        formNameError.style.display = "block";
    }
};

const displayEmailError = () => {
    if(isEmailValid(formEmail.value)){
        formEmailError.style.display = "none";
    } else {
        formEmailError.style.display = "block";
    }
};
const displaySubjectError = () => {
    if(formSubject.value){
        formSubjectError.style.display = "none";
    } else {
        formSubjectError.style.display = "block";
        
    }
};
const displayMessageError = () => {
    if(checkLength(formText.value, 10)){
        formTextError.style.display = "none";
    } else {
        formTextError.style.display = "block";
    }
};
 formName.addEventListener("blur", displayNameError);
 formName.addEventListener("keyup", enableButton);

 formEmail.addEventListener("blur", displayEmailError);
 formEmail.addEventListener("keyup", enableButton);

 formSubject.addEventListener("blur", displaySubjectError);
 formSubject.addEventListener("keyup", enableButton);

 formText.addEventListener("blur", displayMessageError);
 formText.addEventListener("keyup", enableButton);



 
 formButton.addEventListener("click", function(event){
    event.preventDefault();
    if(formButton.classList.contains("disabled")) {
        disabledAnimation(formButton);
        submitMessage.innerHTML = "Please fill out the form before submiting.";
        submitMessage.classList.add("error");
        submitMessage.style.display = "block";
    }else {
    submitMessage.innerHTML = "Your message has been submitted!<br>Thank you for reaching out.";
    formButton.classList.add("disabled");
    submitMessage.classList.remove("error");
    contactForm.reset();
    }
 })