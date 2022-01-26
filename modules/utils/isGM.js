/**
 * Determines if the current user is the GM.
 *
 * @returns {boolean} Whether or not the current user is the GM
 */
export default () => game.users.get(game.userId).isGM;
