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

  login() {
    //here would be where we run the check
    this.props.navigator.push({
      title: 'my games',
      rightButtonTitle: 'add',
      onRightButtonPress: () => {
        console.log('add a new game')
      },
      component: OpenGames,
      passProps: {cards: this.props.cards, openGames: this.props.openGames},
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Sign into Your Account </Text>
        <Text style={styles.label}>username: </Text>
        <TextInput style={styles.input}
          onTextChange={(text) => this.setState({username: text})}/>
        <Text style={styles.label}>password: </Text>
        <TextInput style={styles.input}
          onTextChange={(text) => this.setState({password: text})}/>
        <TouchableHighlight
          onPress={() => {
            console.log('clicked!');
            this.login();
          }}><Text style={styles.submitButton}> submit </Text></TouchableHighlight>
      </View>
    );
  }
};

module.exports = login;
