import { MODULE_SETTINGS } from "./constants.js";
import { registerSetting } from "./settings.js";
import Logger from "./utils/logger.js";
import handleRenderChatMessage from "./events/renderChatMessage.js";

Hooks.once("init", async () => {
  Logger.log("initialize");

  registerSetting(MODULE_SETTINGS.ACCOUNT_ID);
  registerSetting(MODULE_SETTINGS.LICENSE_KEY);

  Hooks.on("renderChatMessage", handleRenderChatMessage);
});
