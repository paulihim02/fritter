// Show an object on the screen.
function showObject(obj) {
  const pre = document.getElementById("response");
  const preParent = pre.parentElement;
  pre.innerText = JSON.stringify(obj, null, 4);
  preParent.classList.add("flashing");
  setTimeout(() => {
    preParent.classList.remove("flashing");
  }, 300);
}

function showResponse(response) {
  response.json().then((data) => {
    showObject({
      data,
      status: response.status,
      statusText: response.statusText,
    });
  });
}

/**
 * IT IS UNLIKELY THAT YOU WILL WANT TO EDIT THE CODE ABOVE.
 * EDIT THE CODE BELOW TO SEND REQUESTS TO YOUR API.
 *
 * Native browser Fetch API documentation to fetch resources: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 */

// Map form (by id) to the function that should be called on submit
const formsAndHandlers = {
  "create-user": createUser,
  "delete-user": deleteUser,
  "change-username": changeUsername,
  "change-password": changePassword,
  "follow-user": followUser,
  "sign-in": signIn,
  "sign-out": signOut,

  "view-all-freets": viewAllFreets,
  "view-freets-by-username": viewFreetsByUsername,
  "create-freet": createFreet,
  "edit-freet": editFreet,
  "delete-freet": deleteFreet,

  "create-circle": createCircle,
  "delete-circle": deleteCircle,
  "view-all-circles": viewAllCircles,
  "view-circle-by-user": viewCircleByUser,
  "add-user-to-circle": addUserToCircle,
  "remove-user-from-circle": removeUserFromCircle,

  "view-all-refreets": viewAllRefreets,
  "view-refreets-by-username": viewRefreetsByUsername,
  "create-refreet": createRefreet,
  "edit-refreet": editRefreet,
  "delete-refreet": deleteRefreet,

  "view-all-follows": viewAllFollows,
  "view-follows-by-username": viewFollowsByUsername,
  "follow-someone": followSomeone,
  "delete-follow": deleteFollow,

  "view-all-comments": viewAllComments,
  "view-comments-by-username": viewCommentsByUsername,
  "comment-on-freet": commentOnFreet,
  "comment-on-comment": commentOnComment,
  "edit-comment": editComment,
  "delete-comment": deleteComment,

  "view-all-circleMe": viewAllCircleMe,
  "view-circleMe-by-username": viewCircleMeByUsername,
  "create-circleMe": createCircleMe,
  "edit-circleMe": editCircleMe,
  "delete-circleMe": deleteCircleMe,

  "view-all-vally": viewAllVally,
  "view-vally-of-username": viewVallyOfUsername,
  "vally-a-freet": vallyAFreet,
  "edit-vally": editVally,
  "delete-vally": deleteVally,

  "view-all-share": viewAllShare,
  "view-shares-of-username": viewSharesOfUsername,
  "share-a-freet": shareAFreet,
  "delete-share": deleteShare,
};

// Attach handlers to forms
function init() {
  Object.entries(formsAndHandlers).forEach(([formID, handler]) => {
    const form = document.getElementById(formID);
    // console.log("form is", form, formID);
    form.onsubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      handler(Object.fromEntries(formData.entries()));
      return false; // Don't reload page
    };
  });
}

const conceptNames = [
  "user",
  "follow",
  "freet",
  "refreet",
  "comment",
  "circle",
  "circleMe",
  "vally",
];

function onlyShowOne(nameToShow) {
  // ex/ user-concept-content
  conceptNames.map((name) => {
    if (name !== nameToShow) {
      document.getElementById(name + "-concept-content").style.display = "none";
    }
    return;
  });

  // toggle display
  const currentDisplay = document.getElementById(
    nameToShow + "-concept-content"
  ).style.display;
  document.getElementById(nameToShow + "-concept-content").style.display =
    currentDisplay === "none" ? "block" : "none";
}

// Attach handlers once DOM is ready
window.onload = init;
