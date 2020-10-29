var inputTitle = document.querySelector("#title")
var inputBody = document.querySelector("#body")
var inputButton = document.querySelector("#save-button")
var cardDisplay = document.querySelector(".card-display")
var favoriteButton = document.querySelector(".favorite-button")
var deleteButton = document.querySelector(".delete-button")

var list = [];

inputButton.addEventListener("click", makeNewCard);
inputTitle.addEventListener("keyup", checkInputs);
inputBody.addEventListener("keyup", checkInputs);
cardDisplay.addEventListener("click", function (event) {
  debugger
  if (event.target === favoriteButton) {
    addStar()
  }
  if (event.target === deleteButton) {
    deleteIdea()
  }
});

function addStar() {
  for (var i = 0; i < list.length; i++) {
    if (list[i].star === false) {
      list[i].updateIdea(list[i])
    }
  }
  // showHide(favoriteButton)
}

function deleteIdea() {
  for (var i = 0; i < list.length; i++) {
    list.splice(i, 1);
  }
  // showHide(deleteButton)
}

function showHide(button) {
  button.classList.toggle("hidden")
}

// when you click delete, the X turns red (innerHTML the red svg) (FUNCTION 1)
// hidden class gets added/removed (ITS OWN FUNCTION (3))
// when you click delete, the idea gets removed fom the list array (spliced)

// when you click favorite, the star turns red (innerHTML the red svg) (FUNCTION 2)
// hidden class gets added/removed
// when you click favorite, the idea gets updated to star = true


function addToList(title, body) {
  var newIdea = new Idea(title, body);
  list.push(newIdea);
};

// function retrieveFromLocalStorage() {
//   debugger;
//   var retrievedObject = localStorage.getItem("ideaCard");
//   var parsedObject = JSON.parse(retrievedObject);
//   list.push(parsedObject);
// }

function clearInputs() {
  inputTitle.value = "";
  inputBody.value = "";
}

function checkInputs(event) {
  if (inputTitle.value !== "" && inputBody.value !== "") {
    inputButton.disabled = false;
  }
}

function makeNewCard(event) {
  event.preventDefault();
  addToList(inputTitle.value, inputBody.value);
  cardDisplay.innerHTML = "";
  for (i = 0; i < list.length; i++) {
    cardDisplay.innerHTML +=
      `
      <article id="${list[i].id}">
        <div class="card-button-bar">
          <button class="favorite-button" id="star-white"><img src="svg-files/star.svg"/></button>
          <button class="favorite-button hidden" id="star-red"><img src="svg-files/star-active.svg"/></button>
          <button class="delete-button" id="x-white"><img src="svg-files/delete.svg"/></button>
          <button class="delete-button hidden" id="x-red"><img src="svg-files/delete-active.svg"/></button>
        </div>
        <div class="card-text">
          <h2>${list[i].title}</h2>
          <p>${list[i].body}</p>
        </div>
        <div class="comment-button-bar">
          <button class="comment-button"><img src="svg-files/comment.svg"/></button>
          <label for="comment-input">Comment</label>
          <form class="comment-form hidden">
            <input type="text" id="comment-input">
          </form>
        </div>
      </article>
      `
  }
  clearInputs();
};
