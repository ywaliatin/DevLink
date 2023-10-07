import React, { useState, useEffect, useContext } from 'react';
import { getDatabase, ref, push, onValue, off } from 'firebase/database';
import UserContext from './UserContext';  // Make sure the path is correct

// Adding the function here
function generateChatIdForUsers(userAId, userBId) {
    return [userAId, userBId].sort().join('-');
  }

function Chat({ jobId }) {
  const { user } = useContext(UserContext);
  console.log("Chat Component User:", user);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const database = getDatabase();
  

  useEffect(() => {
    const recipientUserId = " " // This needs to be set depending on who the logged-in user is chatting with.
    const chatId = generateChatIdForUsers(user.uid, recipientUserId);

    const messagesRef = ref(database, `messages/${chatId}`);

    // Subscribe to new messages being added to Firebase
    const handleNewMessage = snapshot => {
      const allMessages = [];
      snapshot.forEach(childSnapshot => {
        allMessages.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      setMessages(allMessages);
    };

    onValue(messagesRef, handleNewMessage);

    // Cleanup: Unsubscribe from Firebase listener when the component unmounts
    return () => off(messagesRef, 'value', handleNewMessage);
  }, [database, user.uid]);

  const handleSend = () => {
    console.log("User data:", user);  // Temporarily log user data
    if (!user || !user.uid) {
        alert("User not authenticated!");
        return;
    }

    const recipientUserId = " " // This needs to be set depending on who you want to send the message to.
  const chatId = generateChatIdForUsers(user.uid, recipientUserId);

    const messagesRef = ref(database, `messages/${chatId}`);
    push(messagesRef, {
      senderId: user.uid,
      content: newMessage.trim(),
      timestamp: new Date().toISOString()  // for easy sorting and display
    });

    setNewMessage('');  // Clear the input
  };

  return (
    <div>
      <div className="messages">
        {messages.map(message => (
          <div key={message.id} className={user.uid === message.senderId ? 'my-message' : 'their-message'}>
            {message.content}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input value={newMessage} onChange={e => setNewMessage(e.target.value)} />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
