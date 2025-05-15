// script.js

// Game State Module
const gameState = {
    score: 0,
    multiplier: 1,
    multiplierCost: 10,
    passiveIncomeRate: 0,
};

// UI Module
const ui = {
    scoreDisplay: document.getElementById('score'),
    clickButton: document.getElementById('clickButton'),
    multiplierUpgradeButton: document.getElementById('multiplierUpgrade'),
    multiplierDisplay: document.getElementById('multiplier'),
    incomeRateDisplay: document.getElementById('incomeRate'),

    updateDisplay: function() {
        if (this.scoreDisplay) {
            this.scoreDisplay.textContent = Math.floor(gameState.score);
        } else {
            console.error("Score display element not found!");
        }

        if (this.multiplierDisplay) {
            this.multiplierDisplay.textContent = gameState.multiplier;
        } else {
            console.error("Multiplier display element not found!");
        }

        if (this.multiplierUpgradeButton) {
             this.multiplierUpgradeButton.textContent = `Buy Multiplier (Cost: ${gameState.multiplierCost})`;
        }

        if (this.incomeRateDisplay) {
            this.incomeRateDisplay.textContent = gameState.passiveIncomeRate.toFixed(1);
        } else {
            console.error("Income rate display element not found!");
        }
    }
};

// Game Logic Module
const gameLogic = {
    passiveIncomeInterval: null,
    saveInterval: null,
    saveKey: 'idleClickerGameState', // Key for localStorage

    init: function() {
        this.loadGame(); // Load game state first
        ui.updateDisplay(); // Initialize display
        this.setupEventListeners();
        this.startPassiveIncome();
        this.startSaving(); // Start periodic saving
    },

    setupEventListeners: function() {
        if (ui.clickButton) {
            ui.clickButton.addEventListener('click', () => this.handleClick());
        } else {
            console.error("Click button not found!");
        }

        if (ui.multiplierUpgradeButton) {
            ui.multiplierUpgradeButton.addEventListener('click', () => this.buyMultiplierUpgrade());
        } else {
            console.error("Multiplier upgrade button not found!");
        }

        // Save game state before the window is closed or reloaded
        window.addEventListener('beforeunload', () => this.saveGame());
        window.addEventListener('pagehide', () => this.saveGame());
    },

    handleClick: function() {
        gameState.score += 1 * gameState.multiplier;
        ui.updateDisplay();
    },

    buyMultiplierUpgrade: function() {
        if (gameState.score >= gameState.multiplierCost) {
            gameState.score -= gameState.multiplierCost;
            gameState.multiplier++;
            gameState.multiplierCost = Math.floor(gameState.multiplierCost * 1.5); // Increase cost
            this.updatePassiveIncomeRate();
            ui.updateDisplay();
            this.saveGame(); // Save after purchase
        } else {
            alert("Not enough score to buy this upgrade!");
        }
    },

    startPassiveIncome: function() {
        this.updatePassiveIncomeRate(); // Set initial rate

        if (this.passiveIncomeInterval) {
            clearInterval(this.passiveIncomeInterval);
        }

        this.passiveIncomeInterval = setInterval(() => {
            gameState.score += gameState.passiveIncomeRate;
            ui.updateDisplay();
        }, 1000); // Add income every 1 second
    },

    updatePassiveIncomeRate: function() {
         // Example: Increase passive income rate with multiplier
        gameState.passiveIncomeRate = gameState.multiplier * 0.1; // Adjust rate as needed
        ui.updateDisplay(); // Update display after rate change
    },

    saveGame: function() {
        try {
            const stateToSave = JSON.stringify(gameState);
            localStorage.setItem(this.saveKey, stateToSave);
            console.log("Game saved successfully!");
        } catch (e) {
            console.error("Failed to save game:", e);
        }
    },

    loadGame: function() {
        try {
            const savedState = localStorage.getItem(this.saveKey);
            if (savedState) {
                const loadedState = JSON.parse(savedState);
                // Merge loaded state into current gameState, ensuring all properties are covered
                Object.assign(gameState, loadedState);
                console.log("Game loaded successfully!");
            }
        } catch (e) {
            console.error("Failed to load game:", e);
        }
    },

    startSaving: function() {
        if (this.saveInterval) {
            clearInterval(this.saveInterval);
        }
        // Save game state every 30 seconds
        this.saveInterval = setInterval(() => this.saveGame(), 30000);
    }
};

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => gameLogic.init());