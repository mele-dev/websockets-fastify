'use strict';

const fastify = require('fastify')();
const websocket = require('@fastify/websocket');

// Register the WebSocket plugin
fastify.register(websocket);

// Define a WebSocket route
fastify.get('/websocket', { websocket: true }, (connection, req) => {
    console.log('Client connected');

    // Handle incoming messages from the client
    connection.socket.on('message', (message) => {
        console.log(`Received message: ${message}`);
        // Echo the message back to the client
        connection.socket.send(`Server says: ${message}`);
    });

    // Handle client disconnection
    connection.socket.on('close', () => {
        console.log('Client disconnected');
    });
});

// Start the server
fastify.listen({ port: 3000 }, (err) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log('Server listening on http://localhost:3000');
});