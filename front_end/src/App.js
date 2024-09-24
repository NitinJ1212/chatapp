import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Chat from './components/chat';
import './App.css';
import ImageSender from './components/ImageSender';

const socket = io('http://localhost:5000'); // Your server-side origin

const App = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for messages from the server
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up on component unmount
    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    const message = 'Hello from client!';
    socket.emit('message', message); // Send message to the server
  };

  return (
    <div>
      <h1>Socket.IO Chat</h1>
      {/* <button onClick={sendMessage}>Send Message</button>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul> */}
      <ImageSender />
      <Chat />
    </div>
  );
};

export default App;
