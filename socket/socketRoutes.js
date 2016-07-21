const appState = require('../App/appState');
const gameState = require('../App/gameState');

const _saveToState = (state, prop, data) => {
  state[prop] = data;
}

const clientWsRoutes = {
  //--------------- USER RESPONSES --------------------//

  // response coming back after trying to log in
  signInResponse: (response) => {
    console.log(response);
  },

  signUpResponse: (response) => {
    console.log(response);
  }
};

module.exports = clientWsRoutes;
