/**
 * 1. get locations of all the stops (could be on the route)
 * a. get all of the modes
 * b. https://api.tfl.gov.uk/Line/Mode/dlr
 */


// ================== Imports ==================
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const defaultHandlers = require('./WSDefaultHanders');

// use .env file for dev. TODO set environment vars properly in production
if (process.env.NODE_ENV !== 'production') {
  console.log("Using dotenv for environment variables");
  require('dotenv').load();
}

// ================== Express Setup ==================
// create an express 'app' - just a function that handles HTTP requests and responses
const app = express();

// http server - uses app as callback
const server = http.createServer(app);

// create a websocket server instance that uses our HTTP server
const webSocketServer = new WebSocket.Server({ server });


// ================== Websocket Handler Definitions ==================
function sendMessage(webSocket) {
  webSocket.send('something', (error) => {
    if (! typeof error === "undefined") {
      console.log("Error sending message " + error);
    }
  });
}

function broadcastAll(webSocketServer, message) {
  webSocketServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

// ================== Handler Binding ==================

defaultHandlers.detectDrops(webSocketServer);

webSocketServer.on('connection', (webSocket) => {

  defaultHandlers.handleErrors(webSocket);
  defaultHandlers.handleClose(webSocket);
  defaultHandlers.logReceived(webSocket);

});

// setInterval( () => {broadcast("hi")}, 1000);


// ================== Run Server ==================
server.listen(process.env.SERVERPORT, () => {
  console.log("Server listening on port 5000")
});

// app.get('/api/hello', (req, res) => {
//   res.send({ express: 'Hello From Express' });
// });

// app.listen(port, () => console.log(`Listening on port ${port}`));