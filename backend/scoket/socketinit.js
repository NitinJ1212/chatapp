const socekConnection = async (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        // Handle incoming messages
        socket.on('message', (msg) => {
            console.log('Message received:', msg);
            // Broadcast the message to other clients
            socket.broadcast.emit('message', msg);
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

}

module.exports = socekConnection