/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

const vallyEndpoint = "/api/vally";

function viewAllVally(fields) {
  fetch(vallyEndpoint).then(showResponse).catch(showResponse);
}

function viewVallyByUsername(fields) {
  fetch(`${vallyEndpoint}/${fields.username}`)
    .then(showResponse)
    .catch(showResponse);
}

function vallyAFreet(fields) {
  fetch(vallyEndpoint, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: { "Content-Type": "application/json" },
  })
    .then(showResponse)
    .catch(showResponse);
}

function editVally(fields) {
  fetch(`${vallyEndpoint}/${fields.vallyId}`, {
    method: "PUT",
    body: JSON.stringify(fields),
    headers: { "Content-Type": "application/json" },
  })
    .then(showResponse)
    .catch(showResponse);
}

function deleteVally(fields) {
  fetch(`${vallyEndpoint}/${fields.vallyId}`, {
    method: "DELETE",
    body: JSON.stringify(fields),
    headers: { "Content-Type": "application/json" },
  })
    .then(showResponse)
    .catch(showResponse);
}
