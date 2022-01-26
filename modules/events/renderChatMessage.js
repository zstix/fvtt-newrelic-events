import isGM from "../utils/isGM.js";

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
 * @todo Abstract and define the user type to a types file?
 *
 * @typedef {Object} Message
 * @property {Roll} roll
 * @property {string} alias The character name
 * @property {{ name: string }} user The user who produced the roll
 */

/**
 * @param {Message} message Message details
 * @param {Object} [_html] HTML for the message (not currently used)
 * @param {Object} [_data] Theinput data provided (not currently used)
 * @returns {Promise<void>}
 */
export default async (message, _html, _data) => {
  if (!isGM) return;
};
