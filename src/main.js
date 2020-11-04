// Global Query Selectors 👇
var ideaForm = document.querySelector('.idea-form');
var inputTitle = document.querySelector("#idea-title");
var inputBody = document.querySelector("#idea-body");
var inputButton = document.querySelector(".save-button");
var cardDisplay = document.querySelector(".card-display");
var showFavoritesButton = document.querySelector(".filter-button");
var searchBar = document.querySelector(".search-bar");


// Global Variables 👇
var ideaList = [];
var filteredCards = [];


// Event Listeners 👇
window.addEventListener("load", loadIdeaList);
inputButton.addEventListener("click", makeNewCard);
inputTitle.addEventListener("keyup", toggleSaveButton);
inputBody.addEventListener("keyup", toggleSaveButton);
showFavoritesButton.addEventListener("click", toggleFavorites);
searchBar.addEventListener("keyup", searchCards);
cardDisplay.addEventListener("click", function(event) {
  if (event.target.closest(".favorite-button")) {
    for (var i = 0; i < ideaList.length; i++) {
      if (parseInt(event.target.closest("article").id) === ideaList[i].id) {
        addToFavorites(ideaList[i]);
        changeStarColor(ideaList[i]);
      };
    };
  };

  if (event.target.closest(".delete-red")) {
    for (var i = 0; i < ideaList.length; i++) {
      if (parseInt(event.target.closest("article").id) === ideaList[i].id) {
        ideaList.splice(i, 1);
        event.target.closest("article").remove();
      };
    };
    saveIdeaList();
  };
});


// Event Functions and Event Handlers 👇
function toggleSaveButton() {
  if ((inputTitle.value !== "") && (inputBody.value !== "")) {
    inputButton.disabled = false;
  } else {
    inputButton.disabled = true;
  };
};

function addToList(title, body) {
  var newIdea = new Idea(title, body);
  ideaList.push(newIdea);
  saveIdeaList();
};

function makeNewCard(event) {
  event.preventDefault();
  addToList(inputTitle.value, inputBody.value);
  refreshCard(ideaList);
  clearInputs();
  toggleSaveButton();
  loadStars(ideaList);
};

function refreshCard(currentList) {
  cardDisplay.innerHTML = '';
  for (i = 0; i < currentList.length; i++) {
    cardDisplay.innerHTML +=
      `
    <article class="card" id="${currentList[i].id}">
      <div class="card-button-bar">
        <div class="favorite-box">
          <button class="favorite-button white-star" id="${currentList[i].id}"><img src="svg-files/star.svg" alt="white star"/></button>
          <button class="favorite-button red-star hidden" id="${currentList[i].id}"><img src="svg-files/star-active.svg" alt="red star"/></button>
        </div>
        <div class="delete-box">
          <button class="delete-button delete-red" id="${currentList[i].id}"><img src="svg-files/delete-active.svg" alt="delete button hover red"/></button>
          <button class="delete-button delete-white"><img src="svg-files/delete.svg" alt="delete button"/></button>
        </div>
      </div>
      <div class="card-text">
        <h2>${currentList[i].title}</h2>
        <p>${currentList[i].body}</p>
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
  };
  clearInputs();
};

function clearInputs() {
  ideaForm.reset();
};

function addToFavorites(favoritedIdea) {
  favoritedIdea.updateIdea(favoritedIdea);
  saveIdeaList();
};

function changeStarColor(favoritedIdea) {
  var favoriteButton = document.querySelectorAll('.favorite-button');
  for (var i = 0; i < favoriteButton.length; i++) {
    if (favoritedIdea.id === parseInt(favoriteButton[i].id)) {
      favoriteButton[i].classList.toggle("hidden");
    };
  };
};

function saveIdeaList() {
  localStorage.setItem("ideaCards", JSON.stringify(ideaList));
};

function createParsedIdea() {
  var parsedIdea = JSON.parse(localStorage.getItem("ideaCards"));
  for (var i = 0; i < parsedIdea.length; i++) {
    var newIdea = new Idea (
      parsedIdea[i].title,
      parsedIdea[i].body,
      parsedIdea[i].star,
      parsedIdea[i].id
    );
    ideaList.push(newIdea);
  };
};

function loadIdeaList() {
  if (localStorage.length < 1) {
    return;
  };
  createParsedIdea();
  refreshCard(ideaList);
  loadStars(ideaList);
};

function showHide(show, hide) {
  show.classList.remove("hidden");
  hide.classList.add("hidden");
};

function loadStars(currentList) {
  var redStar = document.querySelectorAll('.red-star');
  var whiteStar = document.querySelectorAll('.white-star');
  for (var i = 0; i < currentList.length; i++) {
    if (currentList[i].star) {
      showHide(redStar[i], whiteStar[i]);
    };
  };
};

function checkForStars() {
  var card = document.querySelectorAll('.card');
  for (var i = 0; i < ideaList.length; i++) {
    if (!ideaList[i].star) {
      card[i].classList.add("hidden");
    };
  };
};

function toggleFavorites() {
  if (showFavoritesButton.innerText === 'Show Starred Ideas') {
    checkForStars();
    showFavoritesButton.innerText = 'Show All Ideas';
  } else {
    showFavoritesButton.innerText = 'Show Starred Ideas';
    refreshCard(ideaList);
    loadStars(ideaList);
  };
};

function searchValues(idea) {
  var currentString = searchBar.value.toLowerCase();
  return (
    idea.title.toLowerCase().includes(currentString) ||
    idea.body.toLowerCase().includes(currentString)
  );
};

function searchCards() {
  filteredCards = ideaList.filter(searchValues);
  refreshCard(filteredCards);
  loadStars(filteredCards);
};
