import { MODULE_NAME } from "../constants.js";

const SEPARATOR = "|";

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
 * @returns {(args: *[]) => void} A console logger function
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
