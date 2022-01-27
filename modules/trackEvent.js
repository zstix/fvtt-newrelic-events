import { readSetting } from "./settings.js";
import Logger from "./utils/logger.js";
import { EVENT_TYPE, MODULE_SETTINGS } from "./constants.js";

const API_BASE_URL = "https://insights-collector.newrelic.com/v1";

/**
 * Data to send to New Relic event API.
 *
 * @typedef {Object} FoundryVTTEvent
 * @property {EVENT_TYPE} eventType The event type (always the same)
 * @property {string} eventName The name of the event (e.g. "roll")
 * @property {string} world The ID of the game world
 * @property {string} system The ID of the game system (e.g. dnd5e)
 *
 * @property {string} [rollType] (Optional) The type of roll (e.g. attack, saving throw)
 * @property {string} [rollRquest] (Optional) What was attempted to be roll (e.g. 2d6)
 * @property {string} [rollResult] (Optional) If a d20, the actual number rolled
 * @property {number} [rollTotal] (Optional) The final result of the roll (e.g. 17)
 * @property {boolean} [rollHasAdvantage]
 * @property {boolean} [rollHasDisadvantage]
 *
 * @property {string} [userName] (Optional) Name of _user_ that triggered the event
 * @property {string} [userCharacter] (Optional) Name of the _character_
 */

/**
 * Gets the account-specific API URL for use in API requests.
 *
 * @param {string} accountID Account ID to report to
 * @returns {string} The final API URL for making requests
 */
const _getAPIURL = (accountID) =>
  `${API_BASE_URL}/accounts/${accountID}/events`;

/**
 * Makes a request to the New Relic events API.
 *
 * @param {FoundryVTTEvent} body Event data to send to New Relic
 * @param {string} accountID The account to send the event data to
 * @param {string} licenseKey The New Relic license key for data ingest
 * @returns {Promise<void>}
 */
const _makeAPIRequest = async (body, accountID, licenseKey) => {
  const url = _getAPIURL(accountID);

  try {
    const resp = await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": licenseKey,
      },
      body: body,
    });

    if (resp.status !== 200) {
      throw resp.status;
    }
  } catch (error) {
    Logger.error("Unable to make API request to New Relic events API", error);
  }
};

/**
 * Verifies that a license key and account ID have been set and then
 * constructs an event to send to the API.
 *
 * @param {Object} data Event data to send to New Relic
 * @param {string} data.eventName The name of the event (required)
 * @returns {Promise<void>}
 */
export default async (data) => {
  const licenseKey = readSetting(MODULE_SETTINGS.LICENSE_KEY);
  const accountID = readSetting(MODULE_SETTINGS.ACCOUNT_ID);

  if (!licenseKey || !accountID) {
    Logger.warn("License key and Account ID are required");
    return;
  }

  const body = {
    eventType: EVENT_TYPE,
    world: game.world.id,
    system: game.system.id,
    ...data,
  };

  Logger.log(`Sending ${data.eventName} event to New Relic`);

  await _makeAPIRequest(body, accountID, licenseKey);
};
