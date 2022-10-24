/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

const commentEnpdoint = "/api/comments";

function viewAllComments(fields) {
  fetch(commentEnpdoint).then(showResponse).catch(showResponse);
}

function viewCommentsByUsername(fields) {
  fetch(`${commentEnpdoint}?username=${fields.username}`)
    .then(showResponse)
    .catch(showResponse);
}

function commentOnFreet(fields) {
  fetch(`${commentEnpdoint}?freetComment=true`, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: { "Content-Type": "application/json" },
  })
    .then(showResponse)
    .catch(showResponse);
}

function commentOnComment(fields) {
  fetch(`${commentEnpdoint}`, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: { "Content-Type": "application/json" },
  })
    .then(showResponse)
    .catch(showResponse);
}

function editComment(fields) {
  fetch(`/api/comments/${fields.commentId}`, {
    method: "PUT",
    body: JSON.stringify(fields),
    headers: { "Content-Type": "application/json" },
  })
    .then(showResponse)
    .catch(showResponse);
}

function deleteComment(fields) {
  fetch(`${commentEnpdoint}/${fields.commentId}`, { method: "DELETE" })
    .then(showResponse)
    .catch(showResponse);
}
