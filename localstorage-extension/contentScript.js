//@ts-check

window.localStorage.setItem('umami.disabled', "1");
window.localStorage.setItem('plausible_ignore', "true");

try{
    posthog.opt_out_capturing()
    fathom.blockTrackingForMe();
} catch (e)  {
}
console.log("Analytics opt out extension run")
