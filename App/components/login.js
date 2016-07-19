import React, {Component} from 'react';

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    alignItems: 'center',
    margin: 12,
    marginBottom: 24
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  labels: {
    paddingBottom: 12,
  },
  input: {
    height:32,
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
    color: '#333',
    borderWidth: 1,
    borderColor: '#333',
  },
  submitButton: {
    backgroundColor: '#555',
    color:'#fff',
    fontSize: 24,
    padding: 12
  }
});

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 0,
      username: '',
      password: ''
    }
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
            console.log('submit');
            console.log(this.state.username);
            console.log(this.state.password);
          }}><Text style={styles.submitButton}> submit </Text></TouchableHighlight>
      </View>
    );
  }
};

module.exports = login;
