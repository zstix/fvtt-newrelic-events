import isGM from "../utils/isGM.js";
import getUserDetails from "../utils/getUserDetails.js";
import getRollDetails from "../utils/getRollDetails.js";
import trackEvent from "../trackEvent.js";
import { EVENT_NAMES } from "../constants.js";

/**
 * @typedef {Object} Message
 * @property {import('../utils/getRollDetails').Roll} roll
 * @property {string} alias The character name
 * @property {import('../utils/getUserDetails').User} user The user who produced the message
 */

/**
 * @param {Message} message Message details
 * @param {Object} [_html] HTML for the message (not currently used)
 * @param {Object} [_data] Theinput data provided (not currently used)
 * @returns {Promise<void>}
 */
export default async (message, _html, _data) => {
  if (!isGM()) return;

  /** @todo Handle different types of chat events */

  return trackEvent({
    eventName: EVENT_NAMES.ROLL,
    userCharacter: message.alias,
    ...getRollDetails(message.roll),
    ...getUserDetails(message.user),
  });
};
