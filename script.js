// script.js

// Game State Module
const gameState = {
    score: 0,
    multiplier: 1,
    multiplierCost: 10,
    passiveIncomeRate: 0,
    passiveLevel: 0,
    passiveUpgradeCost: 50,
    gems: 0, // New resource
    inventory: [], // New inventory array
};

// UI Module
const ui = {
    scoreDisplay: document.getElementById('score'),
    clickButton: document.getElementById('clickButton'),
    multiplierUpgradeButton: document.getElementById('multiplierUpgrade'),
    multiplierDisplay: document.getElementById('multiplier'),
    incomeRateDisplay: document.getElementById('incomeRate'),
    passiveUpgradeButton: document.getElementById('passiveUpgrade'),
    passiveLevelDisplay: document.getElementById('passiveLevel'),
    gemsDisplay: document.getElementById('gems'), // New gem display
    findGemsButton: document.getElementById('findGemsButton'), // New find gems button
    inventoryList: document.getElementById('inventoryList'), // New inventory list element


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

        if (this.passiveLevelDisplay) {
            this.passiveLevelDisplay.textContent = gameState.passiveLevel;
        } else {
            console.error("Passive level display element not found!");
        }

         if (this.passiveUpgradeButton) {
             this.passiveUpgradeButton.textContent = `Buy Passive Income Upgrade (Cost: ${gameState.passiveUpgradeCost})`;
        }

        if (this.gemsDisplay) { // Update gems display
            this.gemsDisplay.textContent = gameState.gems;
        } else {
            console.error("Gems display element not found!");
        }

        // Update inventory display
        if (this.inventoryList) {
            this.inventoryList.innerHTML = ''; // Clear current list
            gameState.inventory.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = item;
                this.inventoryList.appendChild(listItem);
            });
        } else {
            console.error("Inventory list element not found!");
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

         if (ui.passiveUpgradeButton) {
            ui.passiveUpgradeButton.addEventListener('click', () => this.buyPassiveUpgrade());
        } else {
            console.error("Passive upgrade button not found!");
        }

        if (ui.findGemsButton) { // Add event listener for find gems button
            ui.findGemsButton.addEventListener('click', () => this.handleFindGems());
        } else {
            console.error("Find gems button not found!");
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

     buyPassiveUpgrade: function() {
        if (gameState.score >= gameState.passiveUpgradeCost) {
            gameState.score -= gameState.passiveUpgradeCost;
            gameState.passiveLevel++;
            gameState.passiveUpgradeCost = Math.floor(gameState.passiveUpgradeCost * 2); // Increase cost
            this.updatePassiveIncomeRate();
            ui.updateDisplay();
            this.saveGame(); // Save after purchase
        } else {
            alert("Not enough score to buy this upgrade!");
        }
    },

    handleFindGems: function() { // New function to find gems
        const foundGems = Math.floor(Math.random() * 5) + 1; // Find 1-5 gems
        gameState.gems += foundGems;
        ui.updateDisplay();
        this.saveGame(); // Save after finding gems
        alert(`You found ${foundGems} gems!`);
    },

    addItemToInventory: function(item) { // New function to add item to inventory
        gameState.inventory.push(item);
        ui.updateDisplay();
        this.saveGame(); // Save after adding item
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
         // Passive income is now based on multiplier AND passive level
        gameState.passiveIncomeRate = (gameState.multiplier * 0.1) + (gameState.passiveLevel * 0.5); // Adjust rate as needed
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
                // Use Object.assign for simple merging, but be cautious with nested objects if they were added
                Object.assign(gameState, loadedState);
                // Ensure inventory is an array after loading, in case it was null/undefined in older saves
                if (!Array.isArray(gameState.inventory)) {
                    gameState.inventory = [];
                }
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