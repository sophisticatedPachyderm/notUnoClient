import React, {Component} from 'react';

import {
  Text,
  View,
  TextInput,
  TouchableHighlight,

} from 'react-native';

// get style sheet from external
const styles = require('./styles/styles').create;
const UserCreateForm = require('./userCreateForm');

class create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirm: '',
      error: '',
    }
    this.createUser = this.createUser.bind(this);
    this.parentSetState = this.parentSetState.bind(this);
    this.showError = (errorMessage) => {
      this.setState({error: errorMessage});
      setTimeout(() => {
        this.setState({error: ''});
      }, 5000);
    }
  }

  // does simple validation and sends the new user's info to the server
  createUser() {
    fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=1', {
      headers: {
        method: 'GET',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((parsedResponse) => {
      console.log('this is the parsed response for the REST request');
      console.log(parsedResponse);
      // reset the state here.
    })
    .catch((err) => {
      console.log(err);
    })
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
        <Text style={styles.title}> Create a new Account </Text>
        <UserCreateForm
          login={() => this.createUser()}
          parentSetState={this.parentSetState}
        />
        <Text style={styles.alert}> {this.state.error} </Text>
      </View>
    );
  }
};

module.exports = create;
