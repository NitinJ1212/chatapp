// src/components/ChatSidebar.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styles from './chatsidebar.module.css'
import { getAllFriendList } from '../..//api/friendapi';
import store from '../../redux/app/store';
import features from '../../redux/features';

const ChatSidebar = ({ }) => {
    const [friend, setFriends] = useState(null);
    const dispatch = useDispatch()

    // const chatID = store.getState().chatID?.chatID;
    const chatID = useSelector((state) => state.chatID.chatID);

    useEffect(() => {
        getFriend()
    }, [])
    const getFriend = async () => {
        const response = await getAllFriendList();
        if (response?.status) {
            setFriends(response?.data)
        }
    }
    const onSelectContact = (id) => {
        dispatch(features.setChatID({ chatID: id }));
    }
    return (
        <div style={{ width: '250px', borderRight: '1px solid #ccc', padding: '10px' }}>
            <h3>Friends</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {friend && friend?.map(contact => (
                    <li
                        className={chatID == contact._id ? styles.active : styles.inactive}
                        key={contact._id}
                        onClick={() => onSelectContact(contact._id)}
                    >
                        {contact.username}
                    </li>
                ))}
            </ul>
        </div >
    );
};

export default ChatSidebar;
