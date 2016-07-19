/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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


const cards = [
  [1,'red'],
  [2,'green'],
  [3,'green'],
  [4,'blue'],
  [5,'yellow'],
  [6,'yellow'],
  [7,'green'],
];

const opengames = [
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

class notUno extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'Login'
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderComponent(this.state.currentPage)}
      </View>
      <Game cards={cards} openGames={opengames}/>
    );
  }
}

AppRegistry.registerComponent('notUno', () => notUno);
