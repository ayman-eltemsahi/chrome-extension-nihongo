import { TAB_ID_KEY } from "./consts";
import { setItem } from "./storage";

export const getSelectedText = () =>
  new Promise<string | undefined>((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      if (!tabId) {
        reject("could not find current tab id");
        return;
      }

      chrome.tabs.sendMessage(tabId, "GET_SELECTED_TEXT", (response) => {
        resolve(response);
      });
    });
  });

export const openNewTab = async (url: string) => {
  const tab = await chrome.tabs.create({ url });
  await setItem(TAB_ID_KEY, tab?.id?.toString() || "");
};
