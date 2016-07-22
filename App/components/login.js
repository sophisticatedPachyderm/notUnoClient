import React, {Component} from 'react';

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

const OpenGames = require('./openGames');
const Create = require('./create');
const FullLogin = require('./fullInputField');
const Button = require('./button');
const appState = require('../appState');
const gameState = require('../gameState');

// get style sheet from external
const styles = require('./styles/styles').login;
const alertStyles = require('./styles/styles').create;

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    }

    // this.create = this.create.bind(this);
    // this.login = this.login.bind(this);

    this.showError = (errorMessage) => {
      this.setState({error: errorMessage});
      setTimeout(() => {
        this.setState({error: ''});
      }, 5000);
    }
  }

  accessGames() {
    // move forward in the navigation path to the user's games
    this.props.navigator.push({
      title: 'my games',
      rightButtonTitle: 'add',
      onRightButtonPress: () => {
        console.log('game added');
        this.props.ws.send(JSON.stringify({
          message: null,
          route: 'createGame',
        }));
      },
      component: OpenGames,
      // passProps: {
      //   cards: this.props.cards,
      //   openGames: this.props.openGames
      // },
      passProps: {
        openGames: appState.openGames,
      },
    });

    // then this will make the call to get the users games
    this.props.ws.send(JSON.stringify({
      route: 'allGames',
      userId: appState.userId,
    }));
  }

  // move user to the create page
  create() {
    this.props.navigator.push({
      title: 'create user',
      component: Create,
      passProps: {ws: this.props.ws, accessGames: this.accessGames.bind(this)},
    });
  }

  // send the user's log in info to the server via websocket
  login() {
    // simple check for empty strings in the username/password
    if (!this.state.username || !this.state.password) {
      this.showError('username and/or password are not strings');
      return;
    }
    // send username and password through the socket
    this.props.ws.send(JSON.stringify({
      username: this.state.username,
      password: this.state.password,
      route: 'signin',
    }));
    // THIS IS STUPID AND WE SHOULD FIX IT LATER, but it works
    setTimeout(() => {
      if (appState.authorized) {
        this.accessGames();
      } else {
        this.showError('sign-in failure because of credentials');
      }
    }, 1500);
  }

  parentSetState(key, value) {
    let obj = {};
    obj[key] = value;
    this.setState(obj);
  }

  render() {
    console.log('appState:', appState);
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Sign into Your Account </Text>
        <FullLogin title={'username: '}
          callback={ (text) => {
            this.parentSetState('username', text);
          }} />
        <FullLogin title={'password: '}
          callback={ (text) => {
            this.parentSetState('password', text);
          }}
          pw={true}/>
        <Button caption={'submit'} callback={this.login.bind(this)} />
        <Button caption={'create'} callback={this.create.bind(this)} />
        <Text style={alertStyles.alert}> { this.state.error } </Text>
      </View>
    );
  }
};

module.exports = login;
