/**
 * 1. get locations of all the stops (could be on the route)
 * a. get all of the modes
 * b. https://api.tfl.gov.uk/Line/Mode/dlr
 */

const express = require('express');
const http = require('http');
const WebSocket = require('ws');

// use .env file for dev. TODO set environment vars properly in production
if (process.env.NODE_ENV !== 'production') {
  console.log("Using dotenv for environment variables");
  require('dotenv').load();
}

// create an express 'app' - just a function that handles HTTP requests and responses
const app = express();

// const port = process.env.PORT || 5000;

// http server - uses app as callback
const server = http.createServer(app);

// create a websocket server instance that uses our HTTP server
const wss = new WebSocket.Server({ server });

// connection with a client established
wss.on('connection', function connection(ws) {

  // websocket lifecycle handling
  ws.on('error', (error) => {
    console.log("Websocket connection error: " + error);
  });

  ws.on('close', (close) => {
    console.log("Websocket closed: " + close);
  });

  // try sending a message immediately after connection opened
  ws.send('something', (error) => {
    if (! typeof error === "undefined") {
      console.log("Error sending message " + error);
    }
  });

  // message handler
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
});

// broadcasting to everyone
broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

setInterval( () => {broadcast("hi")}, 1000);




// use pings to handle dropped connections. The websocket spec dictates that all clients should respond to pings with a pong, so we don't need to implement anything in our client for this to work.
function heartbeat() {
  this.isAlive = true;
}

wss.on('connection', function connection(ws) {
  ws.isAlive = true;
  ws.on('pong', heartbeat);
});

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) {
      console.log("Connection with " + ws + "lost, terminating.");
      return ws.terminate();
    }

    ws.isAlive = false;
    ws.ping(() => { });
  });
}, 30000);


// run the server
server.listen(process.env.SERVERPORT, () => {
  console.log("Server listening on port 5000")
});

// app.get('/api/hello', (req, res) => {
//   res.send({ express: 'Hello From Express' });
// });

// app.listen(port, () => console.log(`Listening on port ${port}`));