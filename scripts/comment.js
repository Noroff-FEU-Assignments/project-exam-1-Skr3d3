

const commentForm = document.getElementById("comment-form");
const commentsContainer = document.querySelector(".comments-container");

commentForm.addEventListener("submit", async function(event){
    event.preventDefault();

    const postId = id;
    const author = document.getElementById("author").value;
    const email = document.getElementById("email").value;
    const comment = document.getElementById("comment").value;

    const commentData = {
        post: postId,
        author_name: author,
        author_email: email,
        content: comment
    };
await postComment(commentData);
});

const url = `http://localhost/travelblog/wp-json/wp/v2/comments`

async function postComment(commentData) {
    try{
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: {"Content-Type": "application/json; charset=UTF-8"}
    });

    if (!response.ok) {
        throw new Error(response.status);
    }

    const responseData = await response.json();
    console.log("Commen posted succesfully", responseData)
}
catch(error){
    console.error("Error posting comment", error)
}
finally{
}
};

async function fetchComments() {
    try{
        const response = await fetch(url);
        commentData = await response.json();


        console.log(commentData);

        commentData.forEach(function(comment){
            commentsContainer.innerHTML += `
            <p>${comment.content.rendered}</p>
            `
        })
    }
    catch(error){console.error("Unable to retrieve comments", error)}
    finally{}
};
fetchComments()