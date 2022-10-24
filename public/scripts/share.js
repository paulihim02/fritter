/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

const shareEndpoint = "/api/shares";

function viewAllShare(fields) {
  fetch(shareEndpoint).then(showResponse).catch(showResponse);
}

function viewSharesOfUsername(fields) {
  fetch(`${shareEndpoint}/${fields.username}`)
    .then(showResponse)
    .catch(showResponse);
}

function shareAFreet(fields) {
  fetch(shareEndpoint, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: { "Content-Type": "application/json" },
  })
    .then(showResponse)
    .catch(showResponse);
}

function deleteShare(fields) {
  fetch(`${shareEndpoint}/${fields.shareId}`, {
    method: "DELETE",
    body: JSON.stringify(fields),
    headers: { "Content-Type": "application/json" },
  })
    .then(showResponse)
    .catch(showResponse);
}
