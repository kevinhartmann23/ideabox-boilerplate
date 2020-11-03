# Ideabox: Group Project

## Contributors
- Tashia Davis - [GitHub](https://github.com/tashiad)
- Matt Dean - [GitHub](https://github.com/mattdeann)
- Kevin Hartmann - [GitHub](https://github.com/kevinhartmann23)

**Other contributors:**
- Adam Vinueza (mentor)
- Melena Suliteanu (mentor)

## Technologies Used
- Javascript
- JSON
- HTML
- CSS
- GitHub
- Git
- Atom

## Project Goals
- Gain an understanding of how to write clean HTML and CSS to match a provided comp
- Understand how to implement client-side data persistence using `localStorage`
- Understand what it looks like to have a separate data model (using a class) and DOM model
- Incorporate & iterate over arrays in order to filter what is being displayed
- Craft code with clean style, using small functions that show trends toward DRYness and SRP

## Overview
Every developer has more ideas than time. As David Allen likes to say "the human brain is for creating ideas, not remembering them." In this project, we built an application that records and archives our ideas (good and bad alike).

Throughout the project, one of our focuses was on providing a fluid and responsive client-side interface. To this end, we relied on JavaScript to implement snappy filtering in the browser, and `localStorage` to persist our wonderful ideas between sessions.

## Instructions For Running and Viewing
**>>Visit the deploy link [here.](https://mattdeann.github.io/ideabox-boilerplate/ "Ideabox Deployed Site")**

### Iteration 0 - Desktop Layout
Our first task was to build out the following comp using HTML and CSS:
![Desktop Layout](https://frontend.turing.io/projects/module-1/assets/ideabox-group/desktop.jpg)

### Iteration 1 - Architecture & Data Model
Next, we set up our files and data model to allow JSON and `localStorage` to persist data on page reload, and JavaScript to manage client-side interactions.

We created 2 JavaScript files:
1. An `idea.js` file that contains an `Idea` class, with properties of `title`, `body`, `star`, and a unique `id` in the constructor. It also included a method of `updateIdea` that allowed us to update an idea's starred state. **_Note: the project spec sheet required 2 more methods of `saveToStorage` and `deleteFromStorage` to be included in the Idea class. We set up our `localStorage` to have only one key with a value of an array of our idea card objects instead of key-value pairs for each individual idea card. Because of this, our local storage methods actually had nothing to do with our `Idea` class file, so we chose to include our `localStorage`-related functions in our `main.js` file (listed below) instead._**
2. A `main.js` file that contains all DOM related JavaScript.

### Iteration 2 - Adding Ideas
After the initial project set up, we started adding some JavaScript functionality for adding ideas! It works as follows:
- When you click "Save", if you entered information in both the "Title" and "Body" input fields, you should see a new idea card with the provided title and body appear in the idea list area below the form. You should also see the "Title" and "Body" input fields clear out. You should _not_ see the page reload.
- If you haven't entered something into either the "Title" or "Body" inputs, you'll notice that the "Save" button is disabled because it is a lighter color and the cursor is not a pointer when you hover over it.

### Iteration 3 - Favoriting & Deleting Ideas
Then, we added favorite and delete functionality. It works like this:
- When you click the "Delete" button on an idea card, the card should be permanently removed from your view. You should _not_ see the page reload.
- When you click the "Star" button on an idea card, if button was an outline of a star (not favorited), the button should now be a filled in star (favorited). If you decide this idea isn't one of your favorites after all, you can click the star again to toggle it back to an outline of a star. You should _not_ see the page reload.

### Iteration 4 - Local Storage & Filtering
Finally, we built out `localStorage`, the "Show Starred Ideas" button in the sidebar, and the search bar. Here's how those work:
- When you create one or more ideas successfully then refresh the page, those idea cards are still in the idea list. If you delete one and then refresh, then it won't show up on page load. If you favorite one and then refresh, that idea card is still in the "favorite" state with the filled in star icon.
- When you click "Show Starred Ideas," you can see only cards that are favorited and the text on that button has changed to "Show All Ideas." You can click "Show All Ideas" to go back to showing all ideas, favorited or not.
- When you type a letter or phrase into the search bar, you should only see the cards that include the letter/phrase in the title or body. If you backspace and delete something from the search bar so that it's empty, you shuold see all cards since no search criteria is being provided.

## Future Features
We added a comment button to each idea card, but it doesn't have any functionality right now! Our next step would be to build this out as follows:
- When you click the "Add" icon on an idea card, a form to add a comment appears.
- When you open the comment form on a card, type something in, and click "Add Comment", the text typed in is now a comment attached to the card.
- When you open the comment form on a card, type something in, and click "Add Comment", the "Comment" input field clears out and is ready to accept another comment.
- If you open the comment form on an idea card and the "Comment" input field is empty, you should notice that the "Add Comment" button is disabled because it is a lighter color and the cursor is not a pointer when you hover over it.
- When you comment on an idea card, then refresh the page, that comment is still on the idea card.
