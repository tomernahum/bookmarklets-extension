
async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function hwButton() {
    const scriptt = `(function(){
        alert("Hello There!")
    })()`

    console.log(scriptt)

    let tab = await getCurrentTab();
    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            eval(`(function(){
                alert("Hello There!")
            })()`)
        },
        args: []
    })
}


window.addEventListener("load", () => {
    document.querySelector("#link-button").addEventListener("click", () => {
        // alert("Going to ttools")
        window.location.href = "https://www.ttools.io"
    })


    document.querySelector("#hw-button").addEventListener("click", hwButton)
})