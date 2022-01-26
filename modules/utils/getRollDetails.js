/**
 * @typedef {Object} Roll
 * @property {string} formula The roll formula used (e.g. "1d20+3")
 * @property {number} total The total result for the roll
 * @property {boolean} hasAdvantage
 * @property {boolean} hasDisadvantage
 * @property {{ flavor: string }} options
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
 * @param {Roll} roll
 */
export default (roll) => ({
  rollType: _getRollType(roll),
  rollRequest: roll.formula,
  rollResult: roll.total,
  rollHasAdvantage: roll.hasAdvantage,
  rollHasDisadvantage: roll.hasDisadvantage,
});
