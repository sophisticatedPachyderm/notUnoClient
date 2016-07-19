import React, {Component} from 'react';

import {
  Text,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';

// get style sheet from external
const styles = require('./styles/styles').create;

class create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirm: '',
      error: '',
    }
  }

  createUser() {
    if (this.state.password === this.state.confirm && this.state.username && this.state.password) {
      console.log('sending new user request');
      this.props.ws.sendData({message: 'hi duke, will you create a user for me.'});
      this.props.accessGames();
    } else {
      this.setState({error: 'Your username and password do not match'});
      setTimeout(() => {
        this.setState({error: ''});
      }, 5000);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Create a new Account </Text>
        <Text style={styles.label}> username: </Text>
        <TextInput style={styles.input}
          autoCapitalize={'none'}
          onChangeText={ (text) => {
            this.setState({username: text});
          }}/>
        <Text style={styles.label}> password: </Text>
        <TextInput style={styles.input}
          autoCapitalize={'none'}
          onChangeText={(text) => {
            this.setState({password: text})
          }}/>
        <Text style={styles.label}> confirm password: </Text>
        <TextInput style={styles.input}
          autoCapitalize={'none'}
          onChangeText={(text) => {
            this.setState({confirm: text});
          }}/>
        <TouchableHighlight
          onPress={() => {
            this.createUser();
          }}>
          <Text style={styles.submitButton}> submit </Text>
        </TouchableHighlight>
        <Text style={styles.alert}> {this.state.error} </Text>
      </View>
    );
  }
};

module.exports = create;
