// systems/combat.js

import { eventScheduler } from './eventScheduler.js';

/**
 * Represents a combat mission.
 * @typedef {object} CombatMission
 * @property {string} id - Unique identifier for the mission.
 * @property {string} name - The name of the mission.
 * @property {number} duration - The total duration of the mission in game ticks or seconds.
 * @property {number} timeRemaining - The time remaining for the mission.
 * @property {function} onComplete - The function to execute when the mission completes.
 * @property {object} [rewards] - Optional rewards for completing the mission (e.g., { score: 100, gems: 5 }).
 */

/**
 * Manages combat and exploration missions.
 */
class CombatSystem {
    constructor() {
        /**
         * @type {CombatMission[]}
         */
        this.activeMissions = [];
        this.nextMissionId = 0;
    }

    /**
     * Starts a new combat mission.
     * @param {string} name - The name of the mission.
     * @param {number} duration - The duration of the mission.
     * @param {object} [rewards] - Optional rewards for completing the mission.
     * @param {function} [onComplete] - Optional callback function on mission completion.
     * @returns {string} The ID of the started mission.
     */
    startMission(name, duration, rewards = {}, onComplete = () => {}) {
        const missionId = `mission_${this.nextMissionId++}`;
        const newMission = {
            id: missionId,
            name,
            duration,
            timeRemaining: duration,
            rewards,
            onComplete: (mission) => {
                console.log(`Mission completed: ${mission.name}`);
                // Process rewards (this will need to interact with gameState)
                // For now, just log
                console.log('Rewards:', mission.rewards);
                onComplete(mission); // Call the provided callback
            }
        };

        this.activeMissions.push(newMission);
        console.log(`Mission started: ${name} with duration ${duration}`);

        // Schedule the mission completion using the event scheduler
        eventScheduler.addEvent(`mission_complete_${missionId}`, duration, () => {
            this.completeMission(missionId);
        });

        return missionId;
    }

    /**
     * Completes a mission and processes its effects.
     * @param {string} missionId - The ID of the mission to complete.
     * @returns {boolean} True if the mission was found and completed, false otherwise.
     */
    completeMission(missionId) {
        const missionIndex = this.activeMissions.findIndex(mission => mission.id === missionId);
        if (missionIndex !== -1) {
            const [completedMission] = this.activeMissions.splice(missionIndex, 1);
            completedMission.onComplete(completedMission);
            return true;
        }
        return false;
    }

    /**
     * Gets all currently active missions.
     * @returns {CombatMission[]} A copy of the active missions array.
     */
    getActiveMissions() {
        return [...this.activeMissions];
    }

    /**
     * Loads mission state from saved data.
     * @param {object[]} savedMissions - The saved mission data.
     */
    loadMissions(savedMissions) {
        if (!savedMissions) return;

        // Clear current missions and load saved ones
        this.activeMissions = [];
        savedMissions.forEach(savedMission => {
            // Re-add to event scheduler if time remaining > 0
            if (savedMission.timeRemaining > 0) {
                 const newMission = {
                    id: savedMission.id,
                    name: savedMission.name,
                    duration: savedMission.duration, // Need original duration to reschedule
                    timeRemaining: savedMission.timeRemaining,
                    rewards: savedMission.rewards,
                    onComplete: (mission) => {
                        console.log(`Mission completed: ${mission.name}`);
                        console.log('Rewards:', mission.rewards);
                        // Need to hook this up to game state later
                    }
                };
                this.activeMissions.push(newMission);
                 eventScheduler.addEvent(`mission_complete_${newMission.id}`, newMission.timeRemaining, () => {
                    this.completeMission(newMission.id);
                });
            }
        });
         // Ensure nextMissionId is higher than any loaded mission ID
        const maxId = savedMissions.reduce((max, mission) => {
            const idNum = parseInt(mission.id.split('_')[1]);
            return idNum > max ? idNum : max;
        }, -1);
        this.nextMissionId = maxId + 1;
    }

    /**
     * Saves mission state.
     * @returns {object[]} An array of active mission states to save.
     */
    saveMissions() {
        return this.activeMissions.map(mission => ({
            id: mission.id,
            name: mission.name,
            duration: mission.duration,
            timeRemaining: mission.timeRemaining,
            rewards: mission.rewards
        }));
    }
}

// Export an instance of the combat system
export const combatSystem = new CombatSystem();