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

// get style sheet from external
const styles = require('./styles/styles').login;
const alertStyles = require('./styles/styles').create;

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appAuthorized: false,
      appUsername: '',
      appUserGames: [],
      username: '',
      userId: null,
      password: '',
      error: '',
    }

    this.showError = (errorMessage) => {
      this.setState({error: errorMessage});
      setTimeout(() => {
        this.setState({error: ''});
      }, 5000);
    }
  }

  login() {
    fetch('https://baconipsum.com/api/?type=meat-and-filler', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((parsedResponse) => {
      console.log(parsedResponse);
      // set the appState in here
      this.accessGames();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  createNewGame() {
    fetch('/api/game/creategame', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: this.state.userId,
      })
    })
    .then((response) => {
      console.log('success');
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  accessGames() {
    this.props.navigator.push({
      title: 'my games',
      component: OpenGames,
      rightButtonTitle: 'add',
      onRightButtonPress: () => {
        console.log('game added');
        this.createGame();
      },
      passProps: {
        state: this.state,
      }
    })
  }

  openCreateScreen() {
    this.props.navigator.push({
      title: 'create user',
      component: Create,
      passProps: {
        accessGames: 'hi',
      },
    })
  }

  parentSetState(key, value) {
    let obj = {};
    obj[key] = value;
    this.setState(obj);
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
        <Button caption={'submit'} callback={this.login.bind(this)} />
        <Button caption={'create'} callback={this.openCreateScreen.bind(this)} />
        <Text style={alertStyles.alert}> { this.state.error } </Text>
      </View>
    );
  }
};

module.exports = login;
