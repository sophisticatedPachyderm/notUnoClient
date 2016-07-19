import React, {Component} from 'react';

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

const OpenGames = require('./openGames');

// get style sheet from external
const styles = require('./styles/styles').login;

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 0,
      username: '',
      password: ''
    }
  }

  accessGames() {
    this.props.navigator.push({
      title: 'my games',
      rightButtonTitle: 'add',
      onRightButtonPress: () => {
        console.log('Do this things here to add a new game!');
        console.log('Login - line 32');
      },
      component: OpenGames,
      passProps: {cards: this.props.cards, openGames: this.props.openGames},
    });
  }

  login() {
    //here would be where we run the check
    if (this.state.username &&this.state.password) {
      this.props.ws.sendData({username: this.state.username, password: this.state.password});
      this.setState({password: ''});
      this.accessGames();
    } else {
      console.log('error, no username or password');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Sign into Your Account </Text>
        <Text style={styles.label}>username: </Text>
        <TextInput autoCapitalize={'none'} style={styles.input}
          onChangeText={(text) => this.setState({username: text})}/>
        <Text style={styles.label}>password: </Text>
        <TextInput autoCapitalize={'none'} style={styles.input}
          onChangeText={(text) => this.setState({password: text})}/>
        <TouchableHighlight
          onPress={() => {
            this.login();
          }}><Text style={styles.submitButton}> submit </Text></TouchableHighlight>
      </View>
    );
  }
};

module.exports = login;
