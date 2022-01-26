import isGM from "../utils/isGM.js";
import trackEvent from "../trackEvent.js";
import { EVENT_NAMES } from "../constants.js";

/**
 * @todo Move this to a types file?
 *
 * @typedef {Object} Roll
 * @property {string} formula The roll formula used (e.g. "1d20+3")
 * @property {number} total The total result for the roll
 * @property {boolean} hasAdvantage
 * @property {boolean} hasDisadvantage
 * @property {{ flavor: string }} options
 */

/**
 * @todo Move this to a types file?
 *
 * @typedef {Object} User
 * @property {string} name The user's name (not character)
 */

/**
 * @todo Abstract and define the user type to a types file?
 *
 * @typedef {Object} Message
 * @property {Roll} roll
 * @property {string} alias The character name
 * @property {User} user The user who produced the message
 */

/**
 * Gets the roll type from the roll "flavor" provided by the platform.
 *
 * @param {Roll} roll
 * @returns {?string} The type of roll (e.g. Strength Saving Throw)
 */
const _getRollType = ({ options }) => options.flavor?.split(":")?.[0];

/**
 * Helper function to get the relevant details from a roll.
 *
 * @todo Move this to it's own helper function?
 *
 * @param {Roll} roll
 */
const _getRollDetails = (roll) => ({
  rollType: _getRollType(roll),
  rollRequest: roll.formula,
  rollResult: roll.total,
  rollHasAdvantage: roll.hasAdvantage,
  rollHasDisadvantage: roll.hasDisadvantage,
});

/**
 * Helper function to get the relevant details from a user.
 *
 * @todo Move this to it's own helper function?
 * @todo Character name
 * @todo Additional relevant character stats
 *
 * @param {User} user
 */
const _getUserDetails = (user) => ({
  userName: user.name,
});

/**
 * @param {Message} message Message details
 * @param {Object} [_html] HTML for the message (not currently used)
 * @param {Object} [_data] Theinput data provided (not currently used)
 * @returns {Promise<void>}
 */
export default async (message, _html, _data) => {
  if (!isGM) return;

  /** @todo Handle different types of chat events */

  return trackEvent({
    eventName: EVENT_NAMES.ROLL,
    ..._getRollDetails(message.roll),
    ..._getUserDetails(message.user),
  });
};
