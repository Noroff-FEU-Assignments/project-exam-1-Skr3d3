

const formContainer = document.querySelector(".form-container");
const commentForm = document.getElementById("comment-form");
const commentsContainer = document.querySelector(".comments-container");
const submitButton = document.getElementById("submitcomment-button");


async function fetchComments() {
    const url = `http://localhost/travelblog/wp-json/wp/v2/comments?post=${id}`;
    try{
        const response = await fetch(url);
        const commentData = await response.json();

        if(commentData.length > 0){
        commentData.forEach(function(comment){
            const date = new Date(comment.date_gmt);
            const dateOnly = date.toISOString().split('T')[0];

            commentsContainer.innerHTML += `
            <div>
            <p>${comment.content.rendered}</p>
            <div class="comment-author">
            <p>${comment.author_name}</p>
            <p>${dateOnly}</p>
            </div>
            </div>
            `
        })}else {
            commentsContainer.innerHTML += `
            <div>
            <p>No comments yet</p>
            </div>
            `
        }
    }
    catch(error){console.error("Unable to retrieve comments", error)}
    finally{
    }
};
fetchComments()


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
    console.log("Comment posted succesfully", responseData)
}
catch(error){
    console.error("Error posting comment", error)
}
finally{
}
};

submitButton.addEventListener("click", async function(event){
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
commentForm.reset();
});

