// script.js

const game = {
    score: 0,
    scoreDisplay: document.getElementById('score'),
    clickButton: document.getElementById('clickButton'),

    init: function() {
        if (this.clickButton) {
            this.clickButton.addEventListener('click', () => this.handleClick());
        } else {
            console.error("Click button not found!");
        }
        this.updateDisplay(); // Initialize display
    },

    handleClick: function() {
        this.score++;
        this.updateDisplay();
    },

    updateDisplay: function() {
        if (this.scoreDisplay) {
            this.scoreDisplay.textContent = this.score;
        } else {
            console.error("Score display element not found!");
        }
    }
};

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => game.init());