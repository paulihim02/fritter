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
    `/api/circles/${fields.username}/${fields.level}`
  );
  fetch(`/api/circles/${fields.username}/${fields.level}`)
    .then(showResponse)
    .catch(showResponse);
}

function createCircle(fields) {
  console.log("fields are", fields, fields.level);
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

function updateCircle(fields) {
  fetch(`/api/circles/`, {
    method: "PUT",
    body: JSON.stringify(fields),
    headers: { "Content-Type": "application/json" },
  })
    .then(showResponse)
    .catch(showResponse);
}

function deleteCircle(fields) {
  fetch(`/api/circles/${fields.id}`, { method: "DELETE" })
    .then(showResponse)
    .catch(showResponse);
}
