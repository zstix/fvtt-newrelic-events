/**
 * @typedef {Object} User
 * @property {string} name The user's name (not character)
 */

/**
 * Helper function to get the relevant details from a user.
 *
 * @todo Character name
 * @todo Additional relevant character stats
 *
 * @param {User} user
 */
export default (user) => ({
  userName: user.name,
});
