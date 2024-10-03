// src/components/MessageBox.js
import React, { useState } from 'react';

const MessageBox = ({ messages, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState('');

    const handleSend = () => {
        if (newMessage.trim()) {
            onSendMessage(newMessage);
            setNewMessage('');
        }
    };

    return (
        <div style={{ padding: '10px', flex: 1 }}>
            <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <strong>{msg.sender}: </strong>
                        <span>{msg.content}</span>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
                style={{ width: 'calc(100% - 100px)', marginRight: '10px' }}
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default MessageBox;
