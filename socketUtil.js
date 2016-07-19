const ws = new WebSocket('wss://notuno.herokuapp.com/');

ws.onopen = (e) => {
  // connection opened
  console.log('on open:', e.target);
  console.log('socket assigned');
};

ws.onmessage = (e) => {
  // a message was received
  console.log('evan gets message');
  let message = JSON.parse(e.data);
  console.log(message);
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

ws.sendData = (data, route) => {
  let message = {
    route: route || 'getGame',
    gameId: 21,
    data: data,
  }
  message = JSON.stringify(message);
  ws.send(message);
}

module.exports = ws;
