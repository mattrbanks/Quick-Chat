import React from "react"
import io from "socket.io-client"
import { userName } from "./pages"

export const context = React.createContext()

const initState = {
  general: [], //these are allChats
  programming: [],
  technology: [],
  politics: [],
}

function reducer(state, action) {
  const { from, msg, topic } = action.payload
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [topic]: [...state[topic], { from, msg }],
      }
    default:
      return state
  }
}

const privInitState = {}

function reducerPriv(state, action) {
  const { from, msg, topic } = action.payload
  switch (action.type) {
    case "SET_PRIVATE_MESSAGE_STATE":
      return { ...state, [action.payload.users]: [] }
    case "RECEIVE_PRIVATE_MESSAGE":
      return {
        ...state,
        [topic]: [...state[topic], { from, msg }],
      }
    default:
      return state
  }
}

/* to initialize this socket a variable called socket is declared
 outside of the functional component because we don't want this to
  re-render every time the store reloads */
let socket //we define socket above the function below

/* there is a closure in this function that captures the value of socket in the context
 of this function even if it changes below. we are emitting in the dashboard component but
  the socket variable was captured all the way up here when the function was defined. 
  So functions that are not arguments are captured from the context of the function
  definition while functions that are arguments are not captured until the call,
  when they are actually invoked. variables in functions can be captured either way.*/
function sendChatAction(value) {
  socket.emit("send chat message", value) //we send message object up to server
}

function sendPrivateAction(privateValue) {
  socket.emit("send private chat message", privateValue)
}

function sendPrivateMessage(receiver) {
  socket.emit("private message", receiver)
}

let topicHolder = []

function sendActiveTopicSocket(value) {
  let tempValue = value
  topicHolder.length = 0
  topicHolder.push(tempValue)
  socket.emit("active-topic-socket", value) //we send activeTopic object up to server
}

const Store = props => {
  const [allChats, dispatch] = React.useReducer(reducer, initState)

  const [privChatList, dispatchPrivChat] = React.useReducer(
    reducerPriv,
    privInitState
  )

  const privChatListCopy = React.useRef(privInitState)

  const [updateChat, setUpdateChat] = React.useState(0)

  React.useEffect(() => {
    privChatListCopy.current = privChatList
  }, [privChatList])

  // this is where socket changes before we even call the function above, when the socket is created.
  if (!socket) {
    socket = io("https://quick-chat--persistent-server.herokuapp.com/") //created client connection that connects when the client starts if no sockets are started. Added a heroku server. Used to be :3001.
    //socket = io(":3001")

    const name = [userName.toString()]
    socket.emit("new-user", name) //kick name to server

    socket.on("chat message", msg => {
      dispatch({ type: "RECEIVE_MESSAGE", payload: msg })
    })

    socket.on("private chat message", msg => {
      dispatchPrivChat({
        type: "RECEIVE_PRIVATE_MESSAGE",
        payload: msg,
      })
    })

    socket.on("private web push notification", msg => {
      fetch(
        "https://quick-chat--persistent-server.herokuapp.com/activeTopic",
        //"http://localhost:3001/activeTopic",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: msg,
          }),
        }
      )

      const publicVapidKey =
        "BOBgli7IFwPg3i3nvW4aDscd1J0Ro7IdpYCOtp9AGQSCzzITlDk3svksQKzlgAlvTLIJifKCBOIfbPRlqDE3gLM"

      // Check for service worker
      if ("serviceWorker" in navigator) {
        send().catch(err => console.log(err))
      }

      // Register SW, Register Push, Send Push
      async function send() {
        // Register Service Worker
        const register = await navigator.serviceWorker.register(
          "../service-worker.js",
          {
            scope: "/",
          }
        )

        // Register Push
        const subscription = await navigator.serviceWorker.ready.then(
          register =>
            register.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
            })
        )

        // Send Push Notification
        topicHolder[0].topic === msg.topic
          ? console.log("Push Not Sent While Receiver Is In Room...")
          : await fetch(
              "https://quick-chat--persistent-server.herokuapp.com/subscribe",
              //"http://localhost:3001/subscribe",
              {
                method: "POST",
                body: JSON.stringify(subscription),
                headers: {
                  "content-type": "application/json",
                },
              }
            ).catch(error => {
              console.error("Error:", error)
            })
      }

      function urlBase64ToUint8Array(base64String) {
        const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
        const base64 = (base64String + padding)
          .replace(/\-/g, "+")
          .replace(/_/g, "/")

        const rawData = window.atob(base64)
        const outputArray = new Uint8Array(rawData.length)

        for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i)
        }
        return outputArray
      }
    })

    socket.on("private message", newChat => {
      //array work on newChat.users to check privChatList for duplicates, avoid 2 priv msg, and also get rid of commas

      let newChatFwd = newChat.users
        .slice()
        .flat()
        .toString()

      let newChatBwd = newChat.users
        .slice()
        .reverse()
        .flat()
        .toString()

      let privKeys = Object.keys(privChatListCopy.current)

      if (privKeys.length === 0) {
        dispatchPrivChat({
          type: "SET_PRIVATE_MESSAGE_STATE",
          payload: newChat,
        })
      } else if (privKeys.length > 0) {
        for (const key of privKeys) {
          if (key === newChatFwd) {
            return console.log("it matches Fwd!")
          } else if (key === newChatBwd) {
            return console.log("it matches Bwd!")
          } else {
            dispatchPrivChat({
              type: "SET_PRIVATE_MESSAGE_STATE",
              payload: newChat,
            })
          }
        }
      }
    })
  }
  let usersListC = []
  let usersTopicsListC = {
    general: [], //these are the userList for that topic
    programming: [],
    technology: [],
    politics: [],
  }

  socket.on("new-user", users => {
    usersListC.length = 0
    for (let i = 0; i < users.length; i++) {
      usersListC.push(users[i])
    }
  })

  socket.on("active-topic-socket", topic => {
    usersTopicsListC.general.length = 0
    usersTopicsListC.programming.length = 0
    usersTopicsListC.technology.length = 0
    usersTopicsListC.politics.length = 0
    for (let i = 0; i < topic.length; i++) {
      if (topic[i].topic === "general") {
        usersTopicsListC.general.push(topic[i])
      } else if (topic[i].topic === "programming") {
        usersTopicsListC.programming.push(topic[i])
      } else if (topic[i].topic === "technology") {
        usersTopicsListC.technology.push(topic[i])
      } else if (topic[i].topic === "politics") {
        usersTopicsListC.politics.push(topic[i])
      }
    }
  })

  socket.on("user-disconnected", nameAndTopic => {
    //try putting this in the same scope as "chat message" to see if the duplicates go away.
    if (nameAndTopic.topic.length === 0) {
      return
    } else {
      setUpdateChat(Math.random())
    }
  })

  /*here we are passing in an object with key allChats with the value of our current
   state coming from our reducer. This gives us the ability to pass in more stuff like
   our action that is going to emit to our reducer*/

  return (
    <div>
      <context.Provider
        value={{
          allChats,
          privChatList,
          sendChatAction,
          sendPrivateAction,
          updateChat,
          usersListC,
          usersTopicsListC,
          sendActiveTopicSocket,
          sendPrivateMessage,
        }}
      >
        {props.children}
      </context.Provider>
    </div>
  )
}

export default Store
