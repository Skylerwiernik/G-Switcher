chrome.runtime.onInstalled.addListener(function(details){
    chrome.tabs.create({ url: "pinPage.html" });


});

var finishInstall = function() {
    window.close()
    chrome.runtime.openOptionsPage()
    toggleEnabled()
    chrome.browserAction.onClicked.removeListener(finishInstall)


}
if (window.location.toString().includes("pinPage.html")) {
    chrome.browserAction.onClicked.addListener(finishInstall)
}
