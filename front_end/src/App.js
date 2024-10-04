// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import Chat from './components/chat';
// import './App.css';
// import ImageSender from './components/ImageSender';
// import GroupChat from './components/groupchat';

// const socket = io('http://localhost:5000'); // Your server-side origin
// console.log(socket);
// const App = () => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     // Listen for messages from the server
//     socket.on('message', (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     // Clean up on component unmount
//     return () => {
//       socket.off('message');
//     };
//   }, []);

//   const sendMessage = () => {
//     const message = 'Hello from client!';
//     socket.emit('message', message); // Send message to the server
//   };

//   return (
//     <div>
//       <h1>Socket.IO Chat</h1>
//       {/* <button onClick={sendMessage}>Send Message</button>
//       <ul>
//         {messages.map((msg, index) => (
//           <li key={index}>{msg}</li>
//         ))}
//       </ul> */}
//       <GroupChat />
//       <ImageSender />
//       <Chat />
//     </div>
//   );
// };

// export default App;








import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './components/chat';
import './App.css';
import ChatMain from './components/ChatMain';
import Layout from './layout/Layout';
import Signin from './components/auth/Signin';
import Cookies from 'js-cookie';
// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const App = () => {
  const [token, setToken] = useState(true);


  const cookieName = 'chatapp-token';
  const cookiee = Cookies.get(cookieName); // Use js-cookie to get the cookie

  if (cookiee) {
    console.log('Cookie value:', cookiee);
  } else {
    console.log('Cookie not found');
  }



  useEffect(() => {
  }, []);

  return (
    <Router>
      <div>
        {token ?
          <Layout>
            <Routes>
              <Route path="/" element={<Chat />} />
            </Routes>
          </Layout>
          :
          <Routes>
            <Route path="/" element={<Signin />} />
          </Routes>
        }
      </div>
    </Router>
  );
};

export default App;