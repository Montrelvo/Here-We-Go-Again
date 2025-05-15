// systems/achievements.js

/**
 * Represents an achievement.
 * @typedef {object} Achievement
 * @property {string} id - Unique identifier for the achievement.
 * @property {string} name - The name of the achievement.
 * @property {string} description - A description of how to unlock the achievement.
 * @property {function} checkCondition - A function that returns true if the achievement is unlocked.
 * @property {boolean} unlocked - Whether the achievement has been unlocked by the player.
 */

/**
 * Manages game achievements.
 */
class AchievementsSystem {
    constructor() {
        /**
         * @type {Achievement[]}
         */
        this.achievements = [
            {
                id: 'first_click',
                name: 'First Click',
                description: 'Click the button for the first time.',
                checkCondition: (gameState) => gameState.score >= 1,
                unlocked: false,
            },
            {
                id: 'score_100',
                name: 'Score Enthusiast',
                description: 'Reach a score of 100.',
                checkCondition: (gameState) => gameState.score >= 100,
                unlocked: false,
            },
            {
                id: 'first_multiplier',
                name: 'Getting Started',
                description: 'Buy your first multiplier upgrade.',
                checkCondition: (gameState) => gameState.multiplier > 1,
                unlocked: false,
            },
            {
                id: 'passive_income_unlocked',
                name: 'Idle Master',
                description: 'Unlock passive income.',
                checkCondition: (gameState) => gameState.passiveLevel > 0,
                unlocked: false,
            },
            // Add more achievements here
        ];
    }

    /**
     * Checks if any achievements have been unlocked based on the current game state.
     * @param {object} gameState - The current game state.
     * @returns {string[]} An array of IDs of newly unlocked achievements.
     */
    checkAchievements(gameState) {
        const newlyUnlocked = [];
        this.achievements.forEach(achievement => {
            if (!achievement.unlocked && achievement.checkCondition(gameState)) {
                achievement.unlocked = true;
                newlyUnlocked.push(achievement.id);
                console.log(`Achievement unlocked: ${achievement.name}`);
                // Optionally trigger a notification or UI update here
            }
        });
        return newlyUnlocked;
    }

    /**
     * Gets all achievements.
     * @returns {Achievement[]} A copy of the achievements array.
     */
    getAllAchievements() {
        return [...this.achievements];
    }

    /**
     * Gets unlocked achievements.
     * @returns {Achievement[]} An array of unlocked achievements.
     */
    getUnlockedAchievements() {
        return this.achievements.filter(ach => ach.unlocked);
    }

    /**
     * Loads achievement state from saved data.
     * @param {object} savedAchievements - The saved achievement data.
     */
    loadAchievements(savedAchievements) {
        if (!savedAchievements) return;

        this.achievements.forEach(achievement => {
            const saved = savedAchievements.find(sa => sa.id === achievement.id);
            if (saved) {
                achievement.unlocked = saved.unlocked;
            }
        });
    }

    /**
     * Saves achievement state.
     * @returns {object[]} An array of achievement states to save.
     */
    saveAchievements() {
        return this.achievements.map(ach => ({
            id: ach.id,
            unlocked: ach.unlocked
        }));
    }
}

// Export an instance of the achievements system
export const achievementsSystem = new AchievementsSystem();