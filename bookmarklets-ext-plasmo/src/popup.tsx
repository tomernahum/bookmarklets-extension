import { useEffect, useState } from "react"
import { useStorage } from "@plasmohq/storage/hook"

import "./style.css"


type Item = {
  id: number
  name: string
  url: string
}

type SetItems = ReturnType<typeof useStorage<Item[]>>[1]


function IndexPopup() {
  const [items, setItems] = useStorage<Item[]>("items", (v)=>v===undefined ? [] : v)



  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 1,
        width: 500,
        minHeight: 250
      }}
    >
      <h1>
        Bookmarklets
      </h1>

      <div style={{
        marginTop: 5
      }}>
        {items.map((item) => {
          return <Item item={item} setItems={setItems}  key={item.id}/>
        })}
      </div>

      <AddBookMarkletButton setItems={setItems}/>


    </div>
  )
}

async function runBookmarklet(item: Item) {
  alert("Hello From function")
  let tabs = await chrome.tabs.query({ active: true})
  alert(JSON.stringify(tabs, null, 4))
  await chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    func: () => {
      document.querySelector("body").style.background = "pink"
      alert("Hello from in the bookmarklet")
      window.location.href = item.url
    },
    args: [],
  })

}

function Item({ item, setItems }: { item: Item, setItems: SetItems }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        
        padding: ".3rem",
        paddingLeft: ".5rem",
        margin: "7px 0px",
        backgroundColor: "lightgreen",
        border: "5px solid green",
        borderRadius: 3
      }}

      onClick={async (e) => {
        alert("hello")
        console.log("Hello")
        await runBookmarklet(item)
      }}
    >

      <p style={{
        fontSize: "1.2rem",
        fontWeight: "500",
      }}>{item.name} | {item.url}</p>

      <div style={{ display: "flex", flexDirection: "row" }}>
        {/* <button 
          style={{
            fontSize: "1.2rem",
            fontWeight: "500",
            marginLeft: "10px",
            border: "4px solid grey",
            padding:"0px 5px",
            borderRadius: 5,
            backgroundColor: "transparent",
            fontFamily: "inherit"
          }}
          >
            E
          </button> */}

        <button 
          style={{
            fontSize: "1.2rem",
            fontWeight: "500",
            marginLeft: "10px",
            border: "4px solid grey",
            padding:"0px 5px",
            borderRadius: 5,
            backgroundColor: "white",
            fontFamily: "inherit"
          }}
          onClick={(e) => {
            e.stopPropagation()
            if (window.confirm("Are you sure you want to delete?")) {
              setItems((prev) => prev.filter((i) => i.id !== item.id))
            }
          }}
          >
            X
          </button>
      </div>
    </div>
  )
}


function AddBookMarkletButton({setItems}: { 
  setItems: SetItems
}) {

  return (
    <button
      onClick={() => {
        
        const itemName = window.prompt("Enter display name")

        if (!itemName) return

        const itemUrl = window.prompt("Enter Bookmarklet Url")

        if (itemName && itemUrl) {
          setItems((prev) => [...prev, { 
            id: Math.floor(Math.random() * 100000),
            name: itemName, 
            url: itemUrl 
          }])
        }
      }}
    >Add Bookmarklet</button>
  )

}

export default IndexPopup
