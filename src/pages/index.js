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
          <div id="help-modal-id" className="no-help-modal">
            <div className="modal-btn-close">
              <button
                onClick={function() {
                  const modal = document.getElementById("help-modal-id")
                  modal.classList.remove("animate-opacity")
                  modal.classList.add("animate-opacity-close")
                  setTimeout(function() {
                    modal.style.display = "none"
                  }, 700)
                }}
              >
                X
              </button>
            </div>
            <p style={{ margin: "1rem 2rem 1rem 2rem", textAlign: "center" }}>
              In the left panel, you have a number of topic rooms you can click
              on to enter. Once you click a topic, you will see the messages for
              that topic in the middle (bottom for mobile) panel. On the right
              panel, you will see all logged in users before you choose a topic.
              Once you are in a topic room, the right panel will show who is
              also in that room or all the users who are logged in. You just
              need to click the button over the list to toggle the two lists.
              You can click a user's name to create a private chat. This chat
              can be found below the main topic room list under "Direct
              Messages". Just click the newly created chat room that contains
              your user name and the user you clicked on to enter a private chat
              space for the two of you to talk. If you are in another private
              chat or in a group chat then you will get a private message
              notification. All panels can be scrolled independently. The emoji
              below the message input box can be clicked for a menu with a large
              selection of emojis and clicked again to close it.
            </p>
          </div>
          <div className="modal-btn">
            <button
              id="btn-modal"
              onClick={function() {
                const modal = document.getElementById("help-modal-id")
                modal.classList.remove("animate-opacity-close")
                modal.classList.add("animate-opacity")
                modal.style.display = "block"
              }}
            >
              How To Use!
            </button>
          </div>
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
        </div>
      </div>
    )
  }
}

export default Chat
