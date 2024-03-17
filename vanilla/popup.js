

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}


function isChromeMV3UserScriptsAvailable() {
    try {
        // Property access which throws if developer mode is not enabled.
        chrome.userScripts;
        if (!chrome.userScripts) {
            console.warn("chrome.userScripts api not found")
            return false
        }
        return true;
    } catch {
        // Not available.
        console.warn("chrome.userScripts api errored")
        return false;
    }
}


/**
 * @param {string} code
 */
async function registerUserScript(text, code) {
    if (!isChromeMV3UserScriptsAvailable())
        return

    //chrome mv3

    chrome.userScripts.register([{
        id: `${text} ${Math.floor(Math.random() * 100000)}`,
        matches: ['*://*/*'],
        js: [{ code: code }],
        
        world: 'MAIN' // todo check if default also works
    }]);



    //firefox mv2 //todo
}





async function registerBtn() {
    let name = document.querySelector("#name-input").value
    let code = document.querySelector("#code-input").value
    
    alert("registering " + code)
    await registerUserScript(name, code)

    console.log(chrome.userScripts.getScripts())
    alert(JSON.stringify(await chrome.userScripts.getScripts(), null, 4))
}

async function executeScript(){

}

window.addEventListener("load", () => {
    console.log("hi")
    document.getElementById("link-button").addEventListener("click", () => {
        alert("Going to ttools")
        window.location.href = "https://www.ttools.io"
    })


    document.getElementById("register-btn").addEventListener("click", registerBtn)
})
console.log("hi")