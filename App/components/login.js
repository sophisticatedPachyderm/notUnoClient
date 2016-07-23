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
      appUserId: null,
      appUsername: '',
      appUserGames: [],
      username: '',
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
    fetch('https://notuno.herokuapp.com/api/user/auth/signin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
    .then((parsedResponse) => {
      // set the appState in here
      this.setState({
        appUsername: parsedResponse.username,
        appUserId: parsedResponse.userId,
        appAuthorized: (parsedResponse.response === 'affirmative'),
      })
    })
    .then(() => {
      // check if we're allowed to move forward
      if (this.state.appAuthorized) {
        this.setState({
          username: '',
          password: '',
        })
        // send a request to the server to get that user's games by Id
        fetch('https://notuno.herokuapp.com/api/game/allgames', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: this.state.appUserId
          })
        })
        // another fetch request...
        .then((response) => response.json())
        .then((parsedResponse) => {
          let output = [];
          for (let key in parsedResponse) {
            output.push({
              gameId: key,
              players: parsedResponse[key].usernameList,
            })
          }
          this.setState({appUserGames: output});
        })
        .then(() => {
          this.accessGames(this.state);
        });
      }
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
    .catch((err) => {
      console.log(err);
    })
  }

  accessGames(properties) {
    this.props.navigator.push({
      title: 'my games',
      component: OpenGames,
      rightButtonTitle: 'add',
      onRightButtonPress: () => {
        console.log('game added');
        this.createNewGame();
      },
      passProps: {
        parentState: properties,
      }
    })
  }

  openCreateScreen() {
    this.props.navigator.push({
      title: 'create user',
      component: Create,
      passProps: {
        appAuthorized: this.state.appAuthorized,
        appUserId: this.state.appUserId,
        appUsername: this.state.appUsername,
        appUserGames: this.state.appUserGames,
        accessGames: this.accessGames.bind(this),
      },
    });
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
