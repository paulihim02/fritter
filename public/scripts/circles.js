/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

function viewAllCircles(fields) {
  fetch("/api/circles").then(showResponse).catch(showResponse);
}

function viewCircleByUser(fields) {
  console.log(
    "in view circle",
    fields,
    `/api/circles/${fields.username}/${fields.rank}`
  );
  fetch(`/api/circles/${fields.username}/${fields.rank}`)
    .then(showResponse)
    .catch(showResponse);
}

function createCircle(fields) {
  console.log("fields are", fields, fields.rank);
  fetch("/api/circles", {
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

function addUserToCircle(fields) {
  fetch(`/api/circles`, {
    method: "PUT",
    body: JSON.stringify({ ...fields, add: true }),
    headers: { "Content-Type": "application/json" },
  })
    .then(showResponse)
    .catch(showResponse);
}

function removeUserFromCircle(fields) {
  fetch(`/api/circles`, {
    method: "PUT",
    body: JSON.stringify({ ...fields, add: false }),
    headers: { "Content-Type": "application/json" },
  })
    .then(showResponse)
    .catch(showResponse);
}

function deleteCircle(fields) {
  fetch("/api/circles", {
    method: "DELETE",
    body: JSON.stringify(fields),
    headers: { "Content-Type": "application/json" },
  })
    .then(showResponse)
    .catch(showResponse);
}
