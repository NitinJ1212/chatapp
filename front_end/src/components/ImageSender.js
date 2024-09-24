import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = "http://localhost:5000"; // Ensure this matches your server URL
const socket = socketIOClient(ENDPOINT);

function ImageSender() {
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState("");

    useEffect(() => {
        socket.on('connection', () => {
            console.log('Socket connected:', socket.id);
        });

        socket.on('imageSaved', (data) => {
            console.log(data, "dddddddddddddddddddd");
            setStatus(`http://localhost:5000/${data.filePath}`);
        });

        socket.on('error', (message) => {
            setStatus('Error: ' + message);
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        return () => {
            socket.off('connect');
            socket.off('imageSaved');
            socket.off('error');
            socket.off('disconnect');
        };
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const sendImage = () => {
        if (image) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageData = event.target.result;
                socket.emit('sendImage', imageData);
                setStatus("Image is being uploaded...");
            };

            reader.readAsArrayBuffer(image); // Ensure image is read as ArrayBuffer
        } else {
            alert('Please select an image first.');
        }
    };

    return (
        <div>
            <h1>Upload Image via Socket.IO</h1>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <img src={status} height={100} width={100} />
            <button onClick={sendImage}>Send Image</button>
            <p>{status}</p>
        </div>
    );
}

export default ImageSender;
