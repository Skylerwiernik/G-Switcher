function iconClicked() {
    chrome.storage.sync.get({
        "highestAccountIndex": 1,
        "currentSelection": 0
    }, function(data) {
        var currentSelection = data["currentSelection"]
        const highestAccountIndex = data["highestAccountIndex"]

        if (currentSelection < highestAccountIndex) {
            currentSelection++
            chrome.storage.sync.set({
                currentSelection: currentSelection
            });
            if (currentSelection === 0) {
                toggleEnabled()
            }
            updateIcon(currentSelection)
        }
        else if (currentSelection === highestAccountIndex) {
            chrome.storage.sync.set({
                currentSelection: -1
            });
            toggleEnabled()
        }
    })
}


function updateIcon(num) {
    chrome.browserAction.setBadgeText({
        "text": num.toString()
    })
    chrome.browserAction.setBadgeBackgroundColor({
        color: "#042a63"
    });
}

function toggleEnabled() {
    const isEnabled = chrome.storage.sync.get({
        "isEnabled": true
    }, function(data) {
        const isEnabled = data["isEnabled"]

        chrome.storage.sync.set({
            isEnabled: !isEnabled
        });
        if (isEnabled) {
            chrome.browserAction.setIcon({
                path: "deactivated-icon.png"
            });
            updateIcon("")
        }
        else {

            chrome.browserAction.setIcon({
                path: "icon.png"
            });
        }
    })

}


chrome.browserAction.onClicked.addListener(iconClicked)
