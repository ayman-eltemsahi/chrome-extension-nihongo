(()=>{"use strict";console.log("adding listener"),chrome.runtime.onMessage.addListener(((e,n,o)=>{var t;"GET_SELECTED_TEXT"===e&&o(null===(t=document.getSelection())||void 0===t?void 0:t.toString())}))})();