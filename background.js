// Mouad Garroud
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        chrome.storage.local.get(["blockedUrls"], (result) => {
            let blockedUrls = result.blockedUrls || [];
            if (blockedUrls.some(blocked => changeInfo.url.includes(blocked))) {
                setTimeout(() => {
                    chrome.tabs.remove(tabId);
                }, 1000);
            }
        });
    }
});
