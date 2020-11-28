<p align="center"><img alt="Quick Chat Login Screen" src="https://github.com/mattrbanks/professional-portfolio/blob/master/src/images/QuickChat.png?raw=true" /></p>

<h1 align="center">
  Quick Chat
</h1>

This is a real-time chat web application that has group topic rooms and private messaging with push notifications. There is a help button, with full instructions to get new users up and running. There is a very fun emoji picker with just about every emoji out there. Private messages are equipped with a service worker to handle push notifications. Notifications must be allowed and they fire when the receiver is not in the private conversation.

## Technologies Used

- **JavaScript**

- **React**

- **GatsbyJS**

- **Material UI**

- **Express**

- **Node**

- **Web Push**

- **Socket.io**

## How Quick Chat Works

#####Login
First, create a username and sign into quick chat. There will be a unique 5 digit alphanumeric id after your name. This will allow users to tell the difference between people with the same name.

#####Chat UI
In the left panel, you have a number of topic rooms you can click on to enter. Once you click a topic, you will see the messages for that topic in the middle (bottom for mobile) panel. On the right panel, you will see all logged in users before you choose a topic. Once you are in a topic room, the right panel will show who is also in that room or all the users who are logged in. You just need to click the button over the list to toggle the two lists. You can click a user's name to create a private chat. This chat can be found below the main topic room list under "Direct Messages". Just click the newly created chat room that contains your user name and the user you clicked on to enter a private chat space for the two of you to talk. If you are in another private chat or in a group chat then you will get a private message notification. All panels can be scrolled independently. The emoji below the message input box can be clicked for a menu with a large selection of emojis and clicked again to close it.

#####Upcoming Features
Database utilization to allow persistent past messages in each room and the ability to create new rooms that are persistent.

## The Images

The images used on this site are all from Pixabay, Pexels, and Unsplash. These sites are all free image databases with no copyright restrictions on a Creative Commons license.

## Visit the website:

[quick-chat.netlify.app](https://quick-chat.netlify.app/)
