/**
 * 1. get locations of all the stops (could be on the route)
 * a. get all of the modes
 * b. https://api.tfl.gov.uk/Line/Mode/dlr
 */


// ================== Imports ==================
const express = require('express');
const http = require('http');
const WebSocket = require('ws');


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
function handleLifecycle(webSocket) {
  webSocket.on('error', (error) => {
    console.log("Websocket connection error: " + error);
  });

  webSocket.on('close', (close) => {
    console.log("Websocket closed: " + close);
  });
}

// STRATEGY: use pings to handle dropped connections. The websocket spec dictates that all clients should respond to pings with a pong, so we don't need to implement anything in our client for this to work.
function detectDrops(webSocketServer) {
  function heartbeat() {
    this.isAlive = true;
  }

  webSocketServer.on('connection', (webSocket) => {
    webSocket.isAlive = true;
    webSocket.on('pong', heartbeat);
  });

  const interval = setInterval(function ping() {
    console.log("Pinging all clients to detect dropped connections");
    webSocketServer.clients.forEach((webSocket) => {
      if (webSocket.isAlive === false) {
        console.log("Connection with " + webSocket + "lost, terminating.");
        return webSocket.terminate();
      }

      webSocket.isAlive = false;
      webSocket.ping(() => { });
    });
  }, 30000);
}

function sendMessage(webSocket) {
  webSocket.send('something', (error) => {
    if (! typeof error === "undefined") {
      console.log("Error sending message " + error);
    }
  });
}

function logReceived(webSocket) {
  webSocket.on('message', (message) => {
    console.log('received: %s', message);
  });
}

function broadcastAll(webSocketServer, message) {
  webSocketServer.clients.forEach( (client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

// ================== Handler Binding ==================

detectDrops(webSocketServer);

// connection with a client established
webSocketServer.on('connection', (webSocket) => {

  handleLifecycle(webSocket);
  logReceived(webSocket);

});


// setInterval( () => {broadcast("hi")}, 1000);







// run the server
server.listen(process.env.SERVERPORT, () => {
  console.log("Server listening on port 5000")
});

// app.get('/api/hello', (req, res) => {
//   res.send({ express: 'Hello From Express' });
// });

// app.listen(port, () => console.log(`Listening on port ${port}`));