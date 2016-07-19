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
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Sign into Your Account </Text>
        <Text style={styles.label}> username: </Text>
        <TextInput style={styles.input}
          onTextChange={(text) => this.setState({username: text})}/>
        <Text style={styles.label}> password: </Text>
        <TextInput style={styles.input}
          onTextChange={(text) => this.setState({password: text})}/>
        <Text style={styles.label}> confirm password: </Text>
        <TextInput style={styles.input}
          onTextChange={(text) => this.setState({confirm: text})}/>
        <TouchableHighlight
          onPress={() => {
            console.log('submit');
            console.log(this.state.username);
            console.log(this.state.password);
          }}><Text style={styles.submitButton}> submit </Text></TouchableHighlight>
      </View>
    );
  }
};

module.exports = create;
