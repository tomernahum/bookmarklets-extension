//@ts-check


async function pip(){
    await chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ["pipScript.js"],
        });
    })
}



window.addEventListener("load", async () => {
    document.querySelector("button")?.addEventListener("click", pip)
    await pip()
    setTimeout(()=>window.close(), 1000)
})

