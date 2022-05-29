import { getSelectedText } from "./utils";

const SEARCH_KANJI = "search-kanji";
const TAB_ID_KEY = "search-kanji-tab-id";

const SearchSelectedKanjiCommand = "search-selected-kanji";

chrome.contextMenus.create({
  id: SEARCH_KANJI,
  title: "Kanji Search %s",
  contexts: ["selection"],
});

const getItem = (key: string) => new Promise((res) => chrome.storage.local.get([key], (result) => res(result?.[key])));
const setItem = (key: string, value: string) =>
  new Promise((res) => chrome.storage.local.set({ [key]: value }, () => res(value)));

const tabExists = (tabId: number) =>
  chrome.tabs
    .get(tabId)
    .then((val) => !!val)
    .catch(() => false);

const handleKanjiSearch = async (input?: string) => {
  const fullText = input?.trim();
  if (!fullText) return;

  const japandictUrl = `https://www.japandict.com/kanji/${fullText[0]}`;
  const kanjiAliveUrl = `https://app.kanjialive.com/${fullText[0]}`;
  const jishoUrl = `https://jisho.org/search/%23kanji%20${fullText}`;

  const url = jishoUrl;
  const tabId = Number(await getItem(TAB_ID_KEY));
  if (tabId > 0 && (await tabExists(tabId))) {
    chrome.tabs.update(tabId, { active: true, url });
  } else {
    const tab = await chrome.tabs.create({ url });
    await setItem(TAB_ID_KEY, tab?.id?.toString() || "");
  }
};

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === SEARCH_KANJI) {
    handleKanjiSearch(info.selectionText);
    return;
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (command === SearchSelectedKanjiCommand) {
    getSelectedText().then((text) => handleKanjiSearch(text));
  }
});
