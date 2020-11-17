self.addEventListener("push", e => {
  const data = e.data.json()
  self.registration.showNotification(data.title, {
    body: "From: " + data.body,
    icon:
      "https://raw.githubusercontent.com/mattrbanks/Quick-Chat/master/src/images/quick-chat-meta.png",
  })
})
