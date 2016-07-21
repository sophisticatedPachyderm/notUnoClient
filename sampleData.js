const cards = [
  [1,'red'],
  [2,'green'],
  [3,'green'],
  [4,'blue'],
  [5,'yellow'],
  [6,'yellow'],
  [7,'green'],
];

const openGames = [
  {
    players: [{username: 'Jean-luc'}, {username: 'Beverly'}, {username: 'Geordi'}, {username: 'Data'}],
    currentPlayer: 6,
    gameId: 234
  },
  {
    players: [{username: 'Jean-luc'}, {username: 'Will'}, {username: 'Geordi'}, {username: 'Data'}],
    currentPlayer: 4,
    gameId: 14
  },
  {
    players: [{username: 'Jean-luc'}, {username: 'Beverly'}, {username: 'Will'}, {username: 'Deanna'}],
    currentPlayer: 0,
    gameId: 26804
  },
];

module.exports = {
  cards: cards,
  openGames: openGames,
};
