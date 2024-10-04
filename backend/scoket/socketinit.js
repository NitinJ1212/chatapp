const socekConnection = async (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        // Handle incoming messages

        socket.on('message', (msg) => {
            console.log('message received:', msg);
            io.emit('message', { message: msg, id: socket.id }); // Broadcast the message to all connected clients
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

}

module.exports = socekConnection