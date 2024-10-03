// Chat.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

// Connect to the Socket.IO server
const socket = io('http://localhost:5000');
const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [receivedMessage, setReceivedMessage] = useState(null);

    useEffect(() => {
        socket.on('message', (newMessage) => {
            console.log(socket, socket?.id, "llllllllllllllllllllll", newMessage);
            setReceivedMessage((prevMessages) => [...prevMessages, newMessage]);

        });

        // Cleanup on component unmount 
        return () => {
            socket.off('message');
        };
    }, []);

    const sendMessage = () => {
        if (message) {
            socket.emit('message', message);
            setMessage('');
        }
    };
    return (
        <div>
            <h1>Chat</h1>
            <div className='chat_div'>

                {receivedMessage && receivedMessage?.map((msg, index) => (
                    <div className={`${socket?.id === msg.id ? "self_messages" : "received_messages"}`} key={index}>
                        <span className="self_inner_text">{msg?.msg}</span>
                    </div>
                ))}

                <div className='child_div'>
                    <input
                        className='input_msg'
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
