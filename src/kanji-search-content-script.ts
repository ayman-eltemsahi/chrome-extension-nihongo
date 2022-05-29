console.log("adding listener");

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request === "GET_SELECTED_TEXT") {
    const selection = document.getSelection()?.toString();

    sendResponse(selection);
  }
});
