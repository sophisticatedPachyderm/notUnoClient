import React, {Component} from 'react';

import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native';

const FullLogin = require('./fullInputField');
const Button = require('./button');

const styles = require('./styles/styles').create;

class userCreateForm extends Component {
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
      <View>
        <FullLogin title={'username: '}
          callback={ (text) => {
            this.props.parentSetState('username', text);
          }} />
        <FullLogin title={'password: '}
          callback={ (text) => {
            this.props.parentSetState('password', text);
          }}
          pw={true} />
        <FullLogin title={'confirm: '}
          callback={ (text) => {
            this.props.parentSetState('confirm', text);
          }}
          pw={true} />
        <Button caption={'create'} callback={() => this.props.login()} />
      </View>
    )
  }
};

module.exports = userCreateForm;
