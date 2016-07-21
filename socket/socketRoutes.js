const appState = require('../App/appState');
const gameState = require('../App/gameState');

const _saveToState = (state, property, data) => {
  state[property] = data;
  // to not confuse with React's `props`, Steven renamed this var
};

const clientWsRoutes = {
  //--------------- USER RESPONSES --------------------//

  // response coming back after trying to log in
  signInResponse: (response) => {
    if (response.response === 'affirmative') {
      _saveToState(appState, 'username', response.username);
      _saveToState(appState, 'authorized', true);
    } else {
      console.log('sign-in failure because of credentials');
    }
  },

  signUpResponse: (response) => {
    console.log(response);
  },

  getGameResponse: (response) => {
    console.log('from get game');
    console.log(response);
  },

  getAllResponse: (response) => {
    console.log('get all games for user');
    console.log(response);
  }
};

module.exports = clientWsRoutes;
