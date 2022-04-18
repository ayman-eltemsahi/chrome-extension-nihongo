console.log("adding listener");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request === "GET_SELECTED_TEXT") {
    const selection = document.getSelection()?.toString();
    console.log("selection", selection);

    sendResponse(selection);
  }
});
