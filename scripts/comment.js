

const commentForm = document.getElementById("comment-form");

commentForm.addEventListener("submit",async function(event){
    event.preventDefault();

    const postId = id;
    const author = document.getElementById("author").value;
    const email = document.getElementById("email").value;
    const comment = document.getElementById("comment").value;

    const commentData = {
        post: postId,
        name: author,
        email: email,
        comment: comment
    };
await postComment(commentData);
});

const url = `https://blog.skr3d3.com/wp-json/wp/v2/comments?post=${id}`

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
    console.warn("Error posting comment", error)
}
finally{
}
}