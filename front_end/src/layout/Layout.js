import React from 'react'
import styles from './layout.module.css'
import ChatSidebar from '../components/common/chatsidebar/ChatSidebar'
import ChatHeader from '../components/common/chatheader/chatHeader'

export default function Layout({ children }) {
    return (
        <>
            <ChatHeader />
            <div className={styles.layout_main}>
                <ChatSidebar />
                {children}
            </div>
        </>
    )
}
