const SEARCH_KANJI = 'search-kanji'

chrome.contextMenus.create(
  {
    id: SEARCH_KANJI,
    title: 'Kanji Search %s',
    contexts: ['selection'],
  }
)

const tabExists = (tabId: number) => chrome.tabs.get(tabId)
  .then((val) => !!val)
  .catch(() => false)

let kanjiSearchTab: chrome.tabs.Tab;

const handleKanjiSearch = async (info: chrome.contextMenus.OnClickData) => {
  const text = info.selectionText?.trim()
  const url = `https://www.japandict.com/kanji/${text}`

  const tabId = kanjiSearchTab?.id
  if (tabId && await tabExists(tabId)) {
    chrome.tabs.update(tabId, { active: true, url })
  } else {
    kanjiSearchTab = await chrome.tabs.create({ url })
  }
}

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === SEARCH_KANJI) {
    handleKanjiSearch(info)
    return
  }
})



