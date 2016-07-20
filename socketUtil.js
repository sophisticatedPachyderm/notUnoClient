const ws = new WebSocket('wss://notuno.herokuapp.com/');
const gameState = require('./App/gameState');


ws.onopen = (e) => {
  // connection opened
  console.log('on open:', e.target);
  console.log('socket assigned');
};

ws.onmessage = (e) => {
  // a message was received
  let message = JSON.parse(e.data);
  console.log(message)
};

ws.onerror = (e) => {
  // an error occurred
  console.log('evan says error');
};

ws.onclose = (e) => {
  // connection closed
  console.log('evan says closed');
  console.log(e.code, e.reason);
};

module.exports = ws;
