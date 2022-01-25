import { MODULE_NAME } from "./constants.js";

/**
 * @param {string} key The key for the setting
 * @returns {string} The full name for the setting
 */
const _getSettingName = (key) => `${MODULE_NAME}.settings.${key}`;

/**
 * Register a world-scoped setting that the GM can set.
 *
 * @todo Implement localization strings
 *
 * @param {string} key The key for the setting
 * @param {*} [type=String] The setting type
 * @returns {void}
 */
export const registerSetting = (key, type = String) => {
  const settingName = _getSettingName(key);

  game.settings.register(MODULE_NAME, settingName, {
    type,
    scope: "world",
    config: true,
    name: `${settingName}.name`,
    hint: `${settingName}.hint`,
  });
};

/**
 * Returns the setting, as a string, if it exists.
 *
 * @param {string} key The key for the setting
 * @returns {string | null} The value for the setting or null
 */
export const readSetting = (key) =>
  game.settings.get(_getSettingName(key)) || "";
