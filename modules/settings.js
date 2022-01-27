import Logger from "./utils/logger.js";
import { MODULE_KEY } from "./constants.js";

/**
 * Register a world-scoped setting that the GM can set.
 *
 * @param {string} key The key for the setting
 * @param {*} [type=String] The setting type
 * @returns {void}
 */
export const registerSetting = (key, type = String) => {
  const id = `${MODULE_KEY}.${key}`;

  Logger.log(`Registering setting: ${id}`);

  game.settings.register(MODULE_KEY, key, {
    type,
    scope: "world",
    config: true,
    name: `${id}.name`,
    hint: `${id}.hint`,
    onChange: (val) => {
      Logger.log(`${id} set to ${val}`);
    },
  });
};

/**
 * Returns the setting, as a string, if it exists.
 *
 * @param {string} key The key for the setting
 * @returns {?string} The value for the setting or null
 */
export const readSetting = (key) => game.settings.get(MODULE_KEY, key);
