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
      appAuthorized: false,
      appUserId: null,
      appUsername: '',
      appUserGames: [],
      username: '',
      password: '',
      confirm: '',
      error: '',
    };
    this.createUser = this.createUser.bind(this);
    this.parentSetState = this.parentSetState.bind(this);
    this.showError = (errorMessage) => {
      this.setState({error: errorMessage});
      setTimeout(() => {
        this.setState({error: ''});
      }, 5000);
    };
  }

  // does simple validation and sends the new user's info to the server
  createUser() {
    fetch('https://notuno.herokuapp.com/api/user/auth/signup', {
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
      console.log('this is the parsed response for the REST request');
      console.log(parsedResponse);
      // reset the state here.
      this.setState({
        appUsername: parsedResponse.username,
        appUserId: parsedResponse.userId,
        appAuthorized: (parsedResponse.response === 'affirmative'),
      });
    })
    .then(() => {
      // check if we're allowed to move forward
      if (this.state.appAuthorized) {
        this.setState({
          username: '',
          password: '',
          confirm: '',
        });

        let output = [];

        // this.setState({appUserGames: output})
        // .then(() => {
        this.props.accessGames(this.props);
        // })
        // .catch((err) => {
          // console.log('second fetch error');
        // });
      }
    })
    .catch((err) => {
      console.log(err);
    });
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
          login={() => {
            if (this.state.password === this.state.confirm) {
              this.createUser();
            } else {
              this.setState({error: 'Passwords do not match'});              
            }
          }}
          parentSetState={this.parentSetState}
        />
        <Text style={styles.alert}> {this.state.error} </Text>
      </View>
    );
  }
}

module.exports = create;
