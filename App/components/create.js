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
    if (this.state.password !== this.state.confirm) {
      this.showError('your passwords do not match');
      return;
    }
    // send username and password through the socket
    this.props.ws.send(JSON.stringify({
      username: this.state.username,
      password: this.state.password,
      route: 'signup',
    }));
    // receive the response on the 'signup' route

    // if username is untaken, create user and progress to fresh games screen

    // else respond with error
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
