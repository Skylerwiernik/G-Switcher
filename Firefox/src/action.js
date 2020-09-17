function iconClicked() {



    browser.storage.sync.get({
        "highestAccountIndex": 1,
        "currentSelection": 0
    }).then(executeAction)
}

function executeAction(data){
    var currentSelection = data["currentSelection"]
    const highestAccountIndex = data["highestAccountIndex"]

    if (currentSelection < highestAccountIndex) {
        currentSelection++
        browser.storage.sync.set({
            currentSelection: currentSelection
        });
        if (currentSelection === 0) {
            toggleEnabled()
        }
        updateIcon(currentSelection)
    }
    else if (currentSelection === highestAccountIndex) {
        browser.storage.sync.set({
            currentSelection: -1
        });
        toggleEnabled()
    }
}

function updateIcon(num) {
    browser.browserAction.setBadgeText({
        "text": num.toString()
    })
    browser.browserAction.setBadgeBackgroundColor({
        color: "#042a63"
    });
}

function toggleEnabled() {
    const isEnabled = browser.storage.sync.get({
        "isEnabled": true
    }).then(completeToggle)

}
function completeToggle(data){
    const isEnabled = data["isEnabled"]

    browser.storage.sync.set({
        isEnabled: !isEnabled
    });
    if (isEnabled) {
        browser.browserAction.setIcon({
            path: "deactivated-icon.png"
        });
        updateIcon("")
    }
    else {

        browser.browserAction.setIcon({
            path: "icon.png"
        });
    }
}

browser.browserAction.onClicked.addListener(iconClicked)
