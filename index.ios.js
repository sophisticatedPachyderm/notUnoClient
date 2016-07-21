import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  NavigatorIOS,
  View
} from 'react-native';


const Login = require('./App/components/login');
const Game = require('./App/components/game');
const Create = require('./App/components/create');
const OpenGames = require('./App/components/openGames');
const ws = require('./socket/socketUtil');

const sampleData = require('./sampleData');
const appState = require('./App/appState');
const gameState = require('./App/gameState');

const _saveToState = (state, property, data) => {
  state[property] = data;
  // to not confuse with React's `props`, Steven renamed this var
};
/*
====================
As of right now, the app is expecting data to come in through a few different ways. First is the player's current hand. That's represented by the 'card' variable below.

Second is the players open games. Represented by the openGames variable below.

Right now, I haven't written in a way to get the deck or the other players' card counts.
====================
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#333',
  },
});

class notUno extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: gameState,
      appState: appState,
    };
  }

  render() {
    return (
      <NavigatorIOS
        style={{flex: 1}}
        initialRoute={{
          title: 'Login',
          component: Login,
          rightButtonTitle: 'Logout',
          onRightButtonPress: () => {
            console.log('logging out');
            _saveToState(appState, 'authorized', false);
          },
          passProps: {
            cards: sampleData.cards,
            openGames: sampleData.openGames,
            ws: ws,
          }
        }}
      />
    );
  }
}

AppRegistry.registerComponent('notUno', () => notUno);
