import { MODULE_NAME } from "../constants.js";

const SEPARATOR = "|";

/**
 * A function that will log arguments to the console, prepended with
 * the module name and a separator.
 *
 * @callback LoggerFunction
 * @param {*[]} args Arguments to log in the console
 * @returns {void}
 */

/**
 * Creates a console logging function that will prepend the output with
 * the module name and a separator.
 *
 * @example <caption>Creating a custom warning function</caption>
 * const warnFunc = _createLogger("warn");
 * warnFunc("Your socks don't match!")
 * // will call console.warn with "new-relic-events | Your socks don't match!"
 *
 * @param {'log' | 'warn' | 'error'} [level = "log"] The console log level
 * @returns {LoggerFunction} A console logger function
 */
const _createLogger =
  (level = "log") =>
  (...args) => {
    console[level](MODULE_NAME, SEPARATOR, ...args);
  };

export default {
  log: _createLogger("log"),
  warn: _createLogger("warn"),
  error: _createLogger("error"),
};
