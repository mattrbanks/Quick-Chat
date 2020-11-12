import React from "react"
import Dashboard from "../components/dashboard"
import Store from "../store"
import { Link } from "gatsby"
import SEO from "../components/seo"
import ImageReusable from "../components/imageReusable"
import quickChatPic from "../images/quick-chat-main2.svg"
import styled from "styled-components"
import "../components/styles.css"
//import Layout from "../components/layout"

export let userName = []

const Chat = props => {
  const [name, setName] = React.useState("")
  const [isLoggedIn, setLoginBoolean] = React.useState(false)

  const nameHandler = e => {
    e.preventDefault()
    userName.push(name)
    setName("")
    setLoginBoolean(true)
  }

  if (isLoggedIn === true) {
    return (
      <div>
        <SEO title="chat" />

        <div>
          <h1 style={{ margin: "1rem" }}>Welcome to Quick Chat.</h1>
          <p style={{ margin: "1rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
            quidem mollitia rerum. Quidem illo repellendus nostrum ullam aliquid
            tempore dignissimos fugiat saepe fugit consectetur cum, deserunt ea
            eaque consequatur at!
          </p>
          <Store>
            <Dashboard />
          </Store>
          <Link
            to="/"
            onClick="window.location.reload()"
            style={{ margin: "1rem" }}
          >
            BACK TO HOMEPAGE AND DISCONNECT
          </Link>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <SEO title="chat" />
        {/* <Layout> */}
        <div id="img-pic">
          {/* <img src={quickChatPic} style={{ objectFit: "fit" }} /> */}
          <div id="sign-in">
            <h1 style={{ margin: "0 1rem 1rem 1rem" }}>Login to Quick Chat</h1>
            <p style={{ margin: "1rem" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto praesentium atque quod, soluta pariatur adipisci!
              Perferendis, reprehenderit aliquam perspiciatis eum minus eveniet
              vero facilis libero fugit quos asperiores dolorem. Doloremque.
            </p>
            <form style={{ margin: "1rem" }} onSubmit={nameHandler}>
              <div>
                <div style={{ display: "block" }}>
                  <div style={{ marginBottom: "1rem" }}>
                    <span>*All items are required for login</span>
                  </div>
                  <div>
                    <label htmlFor="name">Name</label>
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    required
                    value={name}
                    onChange={e => setName(e.target.value.replace(",", ""))}
                  />
                </div>
              </div>
              <button
                type="submit"
                value="Submit"
                style={{ marginTop: "1rem" }}
              >
                Submit Username
              </button>
            </form>
          </div>
          {/* </Layout> */}
        </div>
      </div>
    )
  }
}

export default Chat
