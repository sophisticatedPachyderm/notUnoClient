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

/*
====================
As of right now, the app is expecting data to come in through a few different ways. First is the player's current hand. That's represented by the 'card' variable below.

Second is the players open games. Represented by the openGames variable below.

Right now, I haven't written in a way to get the deck or the other players' card counts.

====================
*/

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
    players: ['Jean-luc', 'Beverly', 'Geordi', 'Data'],
    turn: 6,
    gameId: 234
  },
  {
    players: ['Jean-luc', 'Deanna', 'Will', 'Data'],
    turn: 4,
    gameId: 14
  },
  {
    players: ['Jean-luc', 'Beverly', 'Deanna', 'Will'],
    turn: 0,
    gameId: 26804
  },
];

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

const ws = require('./socketUtil');

class notUno extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <NavigatorIOS
        style={{flex: 1}}
        initialRoute={{
          title: 'Login',
          component: Login,
          passProps: { cards: cards, openGames: openGames, ws: ws}
        }}
      />
    );
  }
}

AppRegistry.registerComponent('notUno', () => notUno);
