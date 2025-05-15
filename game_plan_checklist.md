# Project Plan Checklist: Basic Clicker Game (Modular)

**Goal:** Create a simple web-based clicker game with a modular code structure for easy updates and expansions.

**Files to be created:**

* [`index.html`](index.html): The main HTML file to structure the game interface.
* [`style.css`](style.css): A CSS file for basic styling.
* [`script.js`](script.js): The JavaScript file containing the game logic.

**Steps:**

* [x] 1.  **Project Setup:**
  * [x] Create the project directory (already done: `c:/Users/iman2/Desktop/Here We Go Again`).
  * [x] Create the three core files: [`index.html`](index.html), [`style.css`](style.css), and [`script.js`](script.js).

* [x] 2.  **HTML Structure (`index.html`):**
  * [x] Set up the basic HTML5 document structure.
  * [x] Link the [`style.css`](style.css) file in the `<head>`.
  * [x] Link the [`script.js`](script.js) file at the end of the `<body>`.
  * [x] Add elements for:
    * [x] Displaying the current score (e.g., a `<p>` or `<div>` with an ID).
    * [x] A button that the user will click to increase the score (e.g., a `<button>` with an ID).

* [x] 3.  **Basic CSS Styling (`style.css`):**
  * [x] Add some basic styles to make the game elements visible and centered (optional but improves presentation).

* [x] 4.  **JavaScript Structure and Modularity (`script.js`):**
  * [x] Define an object or use functions to encapsulate game state (like the score) and game logic.
  * [x] Use functions for specific actions like `incrementScore()`, `updateDisplay()`, etc.
  * [x] Ensure separation of concerns (e.g., game logic separate from UI updates).

* [x] 5.  **Core JavaScript Logic Implementation (`script.js`):**
  * [x] Inside the modular structure, declare a variable for the score, initialized to 0.
  * [x] Get references to the score display element and the click button.
  * [x] Implement the `incrementScore` function to update the score variable.
  * [x] Implement the `updateDisplay` function to show the current score on the page.
  * [x] Add an event listener to the click button that calls the appropriate function(s) (e.g., `incrementScore` and then `updateDisplay`).

* [x] 6.  **Testing the Core Mechanic:**
  * [x] Open [`index.html`](index.html) in a web browser.
  * [x] Verify that clicking the button increases the score displayed on the page.

**Optional Enhancements (if you'd like to make it more like an idle game later):**

* [x] 7.  **Add a Score Multiplier/Upgrade:**
  * [x] Add another button in [`index.html`](index.html) for purchasing an upgrade.
  * [x] Within the modular JavaScript structure, add a variable for a click multiplier (initialized to 1).
  * [x] Modify the score increment logic to add `1 * multiplier`.
  * [x] Add logic for the upgrade button, potentially in a dedicated function:
    * [x] Check if the player has enough score to buy the upgrade.
    * [x] If yes, decrease the score by the upgrade cost, increase the multiplier, and update the display.

* [x] 8.  **Add Passive Income:**
  * [x] Within the modular JavaScript structure, use `setInterval` to periodically increase the score based on a passive income rate.
  * [x] Display the passive income rate in [`index.html`](index.html).
