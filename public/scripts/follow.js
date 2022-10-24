/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

const followEndpoint = "/api/follows";

function viewAllFollows(fields) {
  fetch(followEndpoint).then(showResponse).catch(showResponse);
}

function viewFollowsByUsername(fields) {
  fetch(`${followEndpoint}?username=${fields.username}`)
    .then(showResponse)
    .catch(showResponse);
}

function followSomeone(fields) {
  fetch(followEndpoint, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: { "Content-Type": "application/json" },
  })
    .then(showResponse)
    .catch(showResponse);
}

function deleteFollow(fields) {
  fetch(`${followEndpoint}/${fields.unfollowId}`, { method: "DELETE" })
    .then(showResponse)
    .catch(showResponse);
}
