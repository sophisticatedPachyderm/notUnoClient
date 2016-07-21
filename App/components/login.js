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

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      authorized: false,
    }
    this.create = this.create.bind(this);
    this.login = this.login.bind(this);
  }

  accessGames() {
    // move forward in the navigation path to the user's games
    this.props.navigator.push({
      title: 'my games',
      rightButtonTitle: 'add',
      onRightButtonPress: () => {
        console.log('game added');
        this.props.ws.sendData({message: 'Duke, please add a game...'}, 'createGame');
      },
      component: OpenGames,
      passProps: {cards: this.props.cards, openGames: this.props.openGames},
      // passProps: {
      //   openGames: appState.openGames
      // },
    });

    // then this will make the call to get the users games
    this.props.ws.send(JSON.stringify({
      route: 'getGame',
      gameId: 21,
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
      this.setState({error: 'invalid username or password!'});
      console.log('invalid username or password');
      setTimeout(() => {
        this.setState({error: ''});
      }, 5000);
      return;
    }
    // send username and password through the socket
    this.props.ws.send(JSON.stringify({
      username: this.state.username,
      password: this.state.password,
      route: 'signin',
    }));
    // receive the response on the 'signin' route
    // if the response if affirmative, allow passage to a user's games
    if (appState.authorized) {
      // call accessGames
      this.accessGames();
    // else respond with error
    } else {
      console.log('NONE SHALL PASS');
    }
  }

  parentSetState(key, value) {
    let that = this;
    let obj = {};
    obj[key] = value;
    that.setState(obj);
  }

  render() {
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
        <Button caption={'submit'} callback={() => this.login()} />
        <Button caption={'create'} callback={this.create} />
        <Text > { this.state.error } </Text>
      </View>
    );
  }
};

module.exports = login;
