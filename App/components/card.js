import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight
} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    width:width * 0.3,
    height:height * 0.22,
    flex: 1,
    justifyContent: 'space-around',
    marginLeft: 0.01 * width,
    marginRight: 0.01 * width,
    borderRadius: 6
  },
  val: {
    textAlign: 'center',
    color: '#fff',
    alignItems: 'center',
    fontSize: 32
  }
});

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
