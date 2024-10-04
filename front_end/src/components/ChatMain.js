// src/components/ChatMain.js
import React, { useState } from 'react';
import MessageBox from './Messagebox';
import ChatSidebar from './common/chatsidebar/ChatSidebar';

const ChatMain = () => {
    const [contacts] = useState([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
    ]);

    const [selectedContact, setSelectedContact] = useState(null);
    const [messages, setMessages] = useState([]);

    const handleSelectContact = (contact) => {
        setSelectedContact(contact);
        // Optionally, you can fetch messages for the selected contact here
    };

    const handleSendMessage = (content) => {
        if (selectedContact) {
            setMessages((prev) => [
                ...prev,
                { sender: 'You', content },
            ]);
            // Simulate a response from the selected contact
            setMessages((prev) => [
                ...prev,
                { sender: selectedContact.name, content: `Reply from ${selectedContact.name}` },
            ]);
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <ChatSidebar contacts={contacts} onSelectContact={handleSelectContact} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {selectedContact ? (
                    <MessageBox messages={messages} onSendMessage={handleSendMessage} />
                ) : (
                    <div style={{ padding: '20px' }}>
                        <h3>Select a contact to start chatting</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatMain;
