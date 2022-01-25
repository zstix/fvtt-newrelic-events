import { readSetting } from "./settings.js";
import Logger from "./utils/logger.js";
import { MODULE_SETTINGS } from "./constants.js";

const API_BASE_URL = "https://insights-collector.newrelic.com/v1";

/**
 * Gets the account-specific API URL for use in API requests.
 *
 * @param {string} accountID Account ID to report to
 * @returns {string} The final API URL for making requests
 */
const _getAPIURL = (accountID) => `${API_BASE_URL}/${accountID}/events`;

/**
 * Makes a request to the New Relic events API.
 *
 * @param {Object} body Event data to send to New Relic
 * @returns {Promise<void>}
 */
const _makeAPIRequest = async (body) => {
  const licenseKey = readSetting(MODULE_SETTINGS.LICENSE_KEY);
  const accountID = readSetting(MODULE_SETTINGS.ACCOUNT_ID);
  const url = _getAPIURL(accountID);

  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": licenseKey,
      },
      body: JSON.stringify(body),
    });

    if (resp.status !== 200) {
      throw resp.status;
    }
  } catch (error) {
    Logger.error("Unable to make API request to New Relic events API", error);
  }
};

// TODO: typedef for an event
// TODO: export function for tracking event (that calls above func)
