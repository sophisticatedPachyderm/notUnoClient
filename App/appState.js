const appState = {
  // whether the app has recieve a valid log in response from the server
  authorized: false,
  username: '',
  // array with some basic game info for each open game belonging to this user
  openGames: [],
};

module.exports = appState;

/*
==========================
App State
==========================
appState is meant to hold a lot of information that helps run the appState

This is not the place where GAME SPECIFIC information is supposed to be held and referenced

The shape of a single game object above should be something like:
{
  gameId: Int,
  players: [array of the player's usernames],
  currentPlayer: int referencing which player's turn it is
}

==========================
*/
