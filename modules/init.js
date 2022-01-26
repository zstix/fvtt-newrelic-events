import Logger from "./utils/logger.js";
import { registerSetting } from "./settings.js";
import { handleRenderChatMessage } from "./events/renderChatMessage.js";
import { MODULE_SETTINGS } from "./constants.js";

Hooks.once("init", async () => {
  Logger.log("initialize");

  registerSetting(MODULE_SETTINGS.ACCOUNT_ID);
  registerSetting(MODULE_SETTINGS.LICENSE_KEY);

  Hooks.on("renderChatMessage", handleRenderChatMessage);
});
