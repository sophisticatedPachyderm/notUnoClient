import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

// get style sheet from external
const styles = require('./styles/styles').card;

class card extends Component {
  render() {
    const color = this.props.colors[this.props.color];
    const value = this.props.value;
    changeCard = this.props.changeCard;
    return (
       <TouchableHighlight style={[styles.card, {backgroundColor: color}]} onPress={() => changeCard(color, value)}>
        <Text style={styles.val}>{value}</Text>
      </TouchableHighlight>
    );
  }
};

module.exports = card;
