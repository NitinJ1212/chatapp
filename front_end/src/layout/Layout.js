import React from 'react'
import ChatSidebar from '../components/ChatSidebar'

export default function Layout({ children }) {
    return (
        <div>
            <ChatSidebar />
            {children}
        </div>
    )
}
