function save(){
    chrome.storage.sync.get({
        "currentSelection": 0
    }, function (data) {
        if(data["currentSelection"] === -1) {
            iconClicked()
        }
        const numberOfAccounts = document.getElementById("numberOfAccounts").value
        chrome.storage.sync.set({
            highestAccountIndex: numberOfAccounts - 1,
            currentSelection: 0
        }, changeIconDisplay())
    })


}

function changeIconDisplay(e) {
    chrome.browserAction.setBadgeText({
        "text": "0"
    })
    chrome.browserAction.setIcon({
        path: "icon.png"
    });
}


window.onload = function(e){
    chrome.storage.sync.get({
        "highestAccountIndex": 1,
    }, function(data) {
        document.getElementById("numberOfAccounts").value = data["highestAccountIndex"] + 1
    })
}

document.querySelector("form").addEventListener("submit", save);

if (window.location.toString().includes("?")) {
    window.close()
}