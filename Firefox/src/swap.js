
browser.storage.sync.get({
    "currentSelection": 0
}).then(swap)


function swap(data) {
    const currentNumber = data["currentSelection"]
    if (currentNumber === -1) {
        return
    }
    const url = window.location.toString()
    const newURL = url.replace(
        /\/u\/./, "/u/" + currentNumber
    ).replace(
        /authuser=./, "authuser=" + currentNumber
    )
    if (url === newURL) {
        return
    }
    window.location = newURL
}

