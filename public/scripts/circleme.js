/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

const circleMeEndpoint = "/api/circleme";

function viewAllCircleMe(fields) {
  console.log("v all");
  fetch(circleMeEndpoint).then(showResponse).catch(showResponse);
}

function viewCircleMeByUsername(fields) {
  fetch(`${circleMeEndpoint}/${fields.username}`)
    .then(showResponse)
    .catch(showResponse);
}

function createCircleMe(fields) {
  fetch(circleMeEndpoint, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      console.log(response);
      showResponse(response);
    })
    .catch(showResponse);
}

function editCircleMe(fields) {
  fetch(`${circleMeEndpoint}/${fields.circleMeId}`, {
    method: "PUT",
    body: JSON.stringify(fields),
    headers: { "Content-Type": "application/json" },
  })
    .then(showResponse)
    .catch(showResponse);
}

function deleteCircleMe(fields) {
  fetch(`${circleMeEndpoint}/${fields.circleMeId}`, {
    method: "DELETE",
    body: JSON.stringify(fields),
    headers: { "Content-Type": "application/json" },
  })
    .then(showResponse)
    .catch(showResponse);
}
