// Chat.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { getMessages, sendMessages } from './api/messageapi';

// Connect to the Socket.IO server
const socket = io('http://localhost:5000');
const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [receivedMessage, setReceivedMessage] = useState(null);

    const chatID = useSelector((state) => state.chatID.chatID);

    useEffect(() => {
        if (chatID && chatID.length > 0) { getAllMessages() }
        socket.on('message', (newMessage) => {
            setReceivedMessage((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off('message');
        };
    }, [chatID]);
    const getAllMessages = async () => {
        const response = await getMessages(chatID)
        if (response.status) {
            setReceivedMessage(response.data);
        }
    }
    const sendMessage = async () => {
        const response = await sendMessages(message, chatID);
        if (message) {
            socket.emit('message', message);
            setMessage('');
        }
    };
    return (<>
        {chatID !== '' ?
            <div className='chat_div'>
                {receivedMessage && receivedMessage?.map((msg, index) => (
                    <div className={`${socket?.id === msg.id ? "self_messages" : "received_messages"}`} key={index}>
                        <span className="self_inner_text">{msg?.message}</span>
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
            </div> : <div className='no_chat_preview'>
                Start new chat
            </div>
        }
    </>
    );
};

export default Chat;
