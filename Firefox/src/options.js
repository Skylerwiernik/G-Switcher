function save(){
    const numberOfAccounts = document.getElementById("numberOfAccounts").value
    browser.storage.sync.set({
        highestAccountIndex: numberOfAccounts - 1,
        currentSelection: 0
    }).then(changeIconDisplay)
}

function changeIconDisplay(e) {
    browser.browserAction.setBadgeText({
        "text": "0"
    })
}

function displaySuccess() {
    document.getElementById("successIndicator").hidden = false
}

function fillDefault(data) {
    document.getElementById("numberOfAccounts").value = data["highestAccountIndex"] + 1
}

window.onload = function(e){
    browser.storage.sync.get({
        "highestAccountIndex": 1,
    }).then(fillDefault)
}

document.querySelector("form").addEventListener("submit", save);

if (window.location.toString().includes("?")) {
    displaySuccess()
}