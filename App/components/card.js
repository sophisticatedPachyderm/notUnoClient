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
    const colorConverter = {
      blue: '#2196F3',
      green: '#4CAF50',
      red: '#F44336',
      yellow: '#FFEB3B',
    }
    const color = colorConverter[this.props.color];
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
