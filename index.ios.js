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
};


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
    };
  }

  render() {
    return (
      <NavigatorIOS
        style={{flex: 1}}
        initialRoute={{
          title: 'Login',
          component: Login,
          rightButtonTitle: 'logout',
          onRightButtonPress: () => {
            console.log('logging out');
            _saveToState(appState, 'authorized', false);
            _saveToState(appState, 'username', '');
            _saveToState(appState, 'openGames', []);
          },
          passProps: {
            ws: ws,
          }
        }}
      />
    );
  }
}

AppRegistry.registerComponent('notUno', () => notUno);
