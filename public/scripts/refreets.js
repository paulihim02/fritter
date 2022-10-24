/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

const refreetEndpoint = "/api/refreets";

function viewAllRefreets(fields) {
  fetch(refreetEndpoint).then(showResponse).catch(showResponse);
}

function viewRefreetsByUsername(fields) {
  fetch(`${refreetEndpoint}?username=${fields.username}`)
    .then(showResponse)
    .catch(showResponse);
}

function createRefreet(fields) {
  fetch(refreetEndpoint, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: { "Content-Type": "application/json" },
  })
    .then(showResponse)
    .catch(showResponse);
}

function editRefreet(fields) {
  fetch(`${refreetEndpoint}/${fields.refreetID}`, {
    method: "PUT",
    body: JSON.stringify(fields),
    headers: { "Content-Type": "application/json" },
  })
    .then(showResponse)
    .catch(showResponse);
}

function deleteRefreet(fields) {
  fetch(`${refreetEndpoint}/${fields.refreetID}`, { method: "DELETE" })
    .then(showResponse)
    .catch(showResponse);
}
