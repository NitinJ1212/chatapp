// src/components/ChatSidebar.js
import React, { useEffect, useState } from 'react';
import { getAllFriendList } from './api/friendapi';

const ChatSidebar = ({ }) => {
    const [friend, setFriends] = useState(null)
    useEffect(() => {
        getFriend()
    }, [])
    const getFriend = async () => {

        const response = await getAllFriendList();
        console.log(response, "[[[[[[[[[[[[[[[[[[[");
        if (response?.status) {
            setFriends(response?.data)
        }
    }
    const onSelectContact = () => {

    }
    console.log(friend, "ffffffffffffffff")
    return (
        <div style={{ width: '250px', borderRight: '1px solid #ccc', padding: '10px' }}>
            <h3>Friends</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {friend && friend?.map(contact => (
                    <li
                        key={contact.id}
                        onClick={() => onSelectContact(contact)}
                        style={{ cursor: 'pointer', padding: '8px', borderBottom: '1px solid #eee' }}
                    >
                        {contact.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatSidebar;
