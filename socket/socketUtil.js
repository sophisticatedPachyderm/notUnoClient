const ws = new WebSocket('wss://notuno.herokuapp.com/');
const socketRoutes = require('./socketRoutes');
const appState = require('../App/appState');
const gameState = require('../App/gameState');


ws.onopen = (e) => {
  // connection opened
  console.log('on open:', e.target);
  console.log('socket assigned');
};

ws.onmessage = (e) => {
  // =============
  // since these are mostly for testing, let's get rid of these before monday
  // =============
  let message = JSON.parse(e.data);
  
  // =============
  let route = message.route;
  if (socketRoutes[route]) {
    socketRoutes[route](message);
  } else {
    console.log('You sent this to: ', route,'.');
    console.log('invalid route. Did you mean one of these? ');
    for (let route in socketRoutes) {
      console.log('\t' + route);
    }
  }
};

ws.onerror = (e) => {
  // an error occurred
  console.log('WebSocket says error');
};

ws.onclose = (e) => {
  // connection closed
  console.log('WebSocket is closed');
  console.log(e.code, e.reason);
};

module.exports = ws;
