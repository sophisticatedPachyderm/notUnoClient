import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Dimensions
} from 'react-native';

// get style sheet from external
const styles = require('./styles/styles').popup;

const popup = ({title, actionA, actionB, textA, textB}) => (
  <View style={styles.top}>
    <Text style={styles.title}>{title}</Text>
    <TouchableHighlight onPress={() => actionA()}>
      <Text style={[styles.option, {backgroundColor: '#9C27B0', color: '#fff'}]}> {textA} </Text>
    </TouchableHighlight>
    <TouchableHighlight onPress={() => actionB()}>
    <Text style={[styles.option, {backgroundColor: '#FF5722'}]}> {textB} </Text>
    </TouchableHighlight>
  </View>
);

module.exports = popup;
