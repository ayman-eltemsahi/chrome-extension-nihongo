const SEARCH_KANJI = 'search-kanji'
const TAB_ID_KEY = 'search-kanji-tab-id'

chrome.contextMenus.create(
  {
    id: SEARCH_KANJI,
    title: 'Kanji Search %s',
    contexts: ['selection'],
  }
)

const getItem = (key: string) => new Promise(res => chrome.storage.local.get([key], (result) => res(result?.[key])));
const setItem = (key: string, value: string) => new Promise(res => chrome.storage.local.set({ [key]: value }, () => res(value)));

const tabExists = (tabId: number) => chrome.tabs.get(tabId)
  .then((val) => !!val)
  .catch(() => false)

const handleKanjiSearch = async (info: chrome.contextMenus.OnClickData) => {
  const text = info.selectionText?.trim()[0]
  const url = `https://www.japandict.com/kanji/${text}`

  const tabId = Number(await getItem(TAB_ID_KEY))
  if (tabId > 0 && await tabExists(tabId)) {
    chrome.tabs.update(tabId, { active: true, url })
  } else {
    const tab = await chrome.tabs.create({ url })
    await setItem(TAB_ID_KEY, tab?.id?.toString() || '')
  }
}

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === SEARCH_KANJI) {
    handleKanjiSearch(info)
    return
  }
})



