//@ts-check



async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

// window.addEventListener("load", async () => {
//     let tab = await getCurrentTab();
//     alert(JSON.stringify(tab, null, 4))
// })


// let done = false;
// window.addEventListener("load", () => {
//     document.body.style.background = "Indigo";
//     // window.open("https://www.ttools.io", "_blank")
//     window.open("javascript:(function(){alert('hello')})()")
//     done = true;
// })

window.addEventListener("load", () => {
    document.body.style.background = "Indigo";
})
