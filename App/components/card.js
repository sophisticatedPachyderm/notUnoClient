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
    const color = this.props.colors[this.props.card[1]];
    const value = this.props.card[0];
    changeCard = this.props.changeCard;
    const index = this.props.index;
    return (
       <TouchableHighlight style={[styles.card, {backgroundColor: color}]} onPress={() => changeCard(this.props.card, index)}>
        <Text style={styles.val}>{value}</Text>
      </TouchableHighlight>
    );
  }
};

module.exports = card;
