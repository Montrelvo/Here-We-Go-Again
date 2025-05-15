// script.js

const game = {
    score: 0,
    multiplier: 1,
    multiplierCost: 10,
    passiveIncomeRate: 0,
    passiveIncomeInterval: null,

    scoreDisplay: document.getElementById('score'),
    clickButton: document.getElementById('clickButton'),
    multiplierUpgradeButton: document.getElementById('multiplierUpgrade'),
    multiplierDisplay: document.getElementById('multiplier'),
    incomeRateDisplay: document.getElementById('incomeRate'),

    init: function() {
        this.updateDisplay(); // Initialize display
        this.setupEventListeners();
        this.startPassiveIncome();
    },

    setupEventListeners: function() {
        if (this.clickButton) {
            this.clickButton.addEventListener('click', () => this.handleClick());
        } else {
            console.error("Click button not found!");
        }

        if (this.multiplierUpgradeButton) {
            this.multiplierUpgradeButton.addEventListener('click', () => this.buyMultiplierUpgrade());
        } else {
            console.error("Multiplier upgrade button not found!");
        }
    },

    handleClick: function() {
        this.score += 1 * this.multiplier;
        this.updateDisplay();
    },

    buyMultiplierUpgrade: function() {
        if (this.score >= this.multiplierCost) {
            this.score -= this.multiplierCost;
            this.multiplier++;
            this.multiplierCost = Math.floor(this.multiplierCost * 1.5); // Increase cost
            this.updateDisplay();
        } else {
            alert("Not enough score to buy this upgrade!");
        }
    },

    startPassiveIncome: function() {
        // Example: Increase passive income rate with multiplier
        this.passiveIncomeRate = this.multiplier * 0.1; // Adjust rate as needed

        if (this.passiveIncomeInterval) {
            clearInterval(this.passiveIncomeInterval);
        }

        this.passiveIncomeInterval = setInterval(() => {
            this.score += this.passiveIncomeRate;
            this.updateDisplay();
        }, 1000); // Add income every 1 second
    },

    updateDisplay: function() {
        if (this.scoreDisplay) {
            this.scoreDisplay.textContent = Math.floor(this.score); // Display whole number
        } else {
            console.error("Score display element not found!");
        }

        if (this.multiplierDisplay) {
            this.multiplierDisplay.textContent = this.multiplier;
        } else {
            console.error("Multiplier display element not found!");
        }

        if (this.multiplierUpgradeButton) {
             this.multiplierUpgradeButton.textContent = `Buy Multiplier (Cost: ${this.multiplierCost})`;
        }

        if (this.incomeRateDisplay) {
            this.incomeRateDisplay.textContent = this.passiveIncomeRate.toFixed(1); // Display with one decimal place
        } else {
            console.error("Income rate display element not found!");
        }
    }
};

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => game.init());