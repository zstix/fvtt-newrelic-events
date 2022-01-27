/**
 *
 * @typedef {Object} Die
 * @property {number} faces
 * @property {number} total
 */

/**
 * @typedef {Object} Roll
 * @property {string} formula The roll formula used (e.g. "1d20+3")
 * @property {number} total The total result for the roll
 * @property {Die[]} dice The die/dice used for this roll
 * @property {boolean} hasAdvantage
 * @property {boolean} hasDisadvantage
 * @property {{ flavor: string }} options
 */

/**
 * Gets the value of the d20 used for this roll, if applicable.
 *
 * @todo Evaluate if this is the right approach
 *
 * @param {Roll} dice The dice used for this roll
 * @returns {?number} If a d20, this will return the number rolled (before modifiers)
 */
const _getD20Roll = ({ dice }) => dice.find((d) => d.faces === 20)?.total;

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
  rollResult: _getD20Roll(roll),
  rollTotal: roll.total,
  rollHasAdvantage: roll.hasAdvantage,
  rollHasDisadvantage: roll.hasDisadvantage,
});
