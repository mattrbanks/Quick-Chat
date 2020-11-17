import React from "react"
import Dashboard from "../components/dashboard"
import Store from "../store"
import { Link } from "gatsby"
import SEO from "../components/seo"
import ImageReusable from "../components/imageReusable"
import quickChatPic from "../images/quick-chat.svg"
import styled from "styled-components"
import "../components/styles.css"
import { useTheme, useMediaQuery } from "@material-ui/core"
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

  const theme = useTheme()

  const mobileChatP = useMediaQuery(
    `${theme.breakpoints.between("0", "500")} and (orientation: portrait)`
  )

  const mobileChatL = useMediaQuery(
    `${theme.breakpoints.between("0", "900")} and (orientation: landscape)`
  )

  if (isLoggedIn === true) {
    return (
      <div
        className={
          mobileChatP
            ? "dash-mobile"
            : mobileChatL
            ? "dash-mobile"
            : "dash-main"
        }
      >
        <SEO title="chat" />

        <div>
          <h1
            style={{
              margin: "0 1rem 1rem 1rem",
              paddingTop: "1rem",
              fontFamily: "Rufina, serif",
              textAlign: "center",
            }}
          >
            Welcome to Quick Chat.
          </h1>
          <p style={{ margin: "1rem", textAlign: "center" }}>
            Click a users name to create a private chat room. If you are not in
            the private room you will receive a notification.
          </p>
          <Store>
            <Dashboard />
          </Store>
          <div id="disconnect-btn">
            <Link
              to="/"
              onClick="window.location.reload()"
              style={{
                margin: "1rem",
                border: "1px solid #fff",
                color: "#fff",
                borderRadius: "50px",
                padding: "0.5rem",
                backgroundColor: "rgb(0, 0, 0, 0.8)",
              }}
            >
              DISCONNECT
            </Link>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <SEO title="chat" />
        {/* <Layout> */}
        <div id="img-pic">
          <div id="quick-chat">
            <img
              src={quickChatPic}
              style={{ objectFit: "fit", marginTop: "1rem" }}
            />
          </div>
          <div id="sign-in">
            <h3 style={{ margin: "0 1rem 1rem 1rem", color: "#fff" }}>
              Login to Quick Chat
            </h3>
            <p style={{ margin: "1rem", color: "#fff" }}>
              This is a space where you can quickly connect with friends and
              talk.
            </p>
            <form style={{ margin: "1rem" }} onSubmit={nameHandler}>
              <div>
                <div style={{ display: "block" }}>
                  <div>
                    <label htmlFor="name" style={{ color: "#fff" }}>
                      Name
                    </label>
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
                style={{
                  marginTop: "1rem",
                  border: "1px solid #fff",
                  borderRadius: "50px",
                  backgroundColor: "rgb(171, 76, 180, 0.2)",
                  color: "#fff",
                  cursor: "pointer",
                  outline: "0",
                }}
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
