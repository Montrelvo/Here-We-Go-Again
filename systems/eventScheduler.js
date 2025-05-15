// systems/eventScheduler.js

/**
 * Represents a scheduled event.
 * @typedef {object} ScheduledEvent
 * @property {string} id - Unique identifier for the event.
 * @property {string} type - The type of event (e.g., 'timedBuff', 'productionCycle').
 * @property {number} duration - The total duration of the event in game ticks or seconds.
 * @property {number} timeRemaining - The time remaining for the event.
 * @property {function} callback - The function to execute when the event completes.
 * @property {object} [data] - Optional data associated with the event.
 */

/**
 * Manages the scheduling and processing of timed events in the game.
 */
class EventScheduler {
    constructor() {
        /**
         * @type {ScheduledEvent[]}
         */
        this.eventQueue = [];
        this.nextEventId = 0;
    }

    /**
     * Adds a new event to the schedule.
     * @param {string} type - The type of event.
     * @param {number} duration - The duration of the event.
     * @param {function} callback - The function to call when the event finishes.
     * @param {object} [data] - Optional data for the event.
     * @returns {string} The ID of the scheduled event.
     */
    addEvent(type, duration, callback, data = {}) {
        const eventId = `event_${this.nextEventId++}`;
        const newEvent = {
            id: eventId,
            type,
            duration,
            timeRemaining: duration,
            callback,
            data
        };
        this.eventQueue.push(newEvent);
        console.log(`Event added: ${type} with duration ${duration}`);
        return eventId;
    }

    /**
     * Processes the event queue for a given time delta.
     * @param {number} deltaTime - The time elapsed since the last update (e.g., in seconds or ticks).
     */
    update(deltaTime) {
        const completedEvents = [];
        this.eventQueue.forEach(event => {
            event.timeRemaining -= deltaTime;
            if (event.timeRemaining <= 0) {
                completedEvents.push(event);
            }
        });

        // Process completed events and remove them from the queue
        this.eventQueue = this.eventQueue.filter(event => event.timeRemaining > 0);
        completedEvents.forEach(event => {
            console.log(`Event completed: ${event.type}`);
            try {
                event.callback(event); // Execute the callback with the event data
            } catch (error) {
                console.error(`Error executing event callback for ${event.id}:`, error);
            }
        });
    }

    /**
     * Removes an event from the schedule by its ID.
     * @param {string} eventId - The ID of the event to remove.
     * @returns {boolean} True if the event was found and removed, false otherwise.
     */
    removeEvent(eventId) {
        const initialLength = this.eventQueue.length;
        this.eventQueue = this.eventQueue.filter(event => event.id !== eventId);
        return this.eventQueue.length < initialLength;
    }

    /**
     * Gets all currently scheduled events.
     * @returns {ScheduledEvent[]} A copy of the current event queue.
     */
    getEvents() {
        return [...this.eventQueue];
    }
}

// Export an instance of the scheduler to be used throughout the game
export const eventScheduler = new EventScheduler();