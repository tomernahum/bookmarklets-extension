
import { Storage } from "@plasmohq/storage"

const storage = new Storage()

await storage.set("serial-number", 47)
await storage.set("make", "plasmo-corp")

storage.watch({
    "serial-number": (c) => {
        console.log(c.newValue)
    },
    make: (c) => {
        console.log(c.newValue)
    }
})
 
await storage.set("serial-number", 96)
await storage.set("make", "PlasmoHQ")



export {}
console.log("HELLO WORLD FROM BGSCRIPTS")