import React, {Component} from 'react';

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Dimensions
} from 'react-native';

// require from external style sheet
const styles = require('./styles/styles').gameListItem;

class gameListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const game = this.props.game;
    const index = this.props.index;
    const chooseGame = this.props.chooseGame;

    const colors = {
      0: '#2196F3',
      1: '#4CAF50',
      2: '#F44336',
      3: '#FFEB3B',
    }

    let players = game.players.map((person, index) => {
      return <Text key={index} style={{padding:6}}>{person}</Text>
    });
    return (
      <TouchableHighlight style={styles.container} onPress={() => {chooseGame()}}>
        <View>
          <View style={{flex:0.05}} />
          <View style={[styles.gameContainer, {backgroundColor: colors[index % 4]}]}>
            <Text style={styles.gameId}>game ID: {game.gameId}</Text>
            <View style={styles.players}>{players}</View>
            <Text style={styles.turn}>turn: {game.turn}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
};

module.exports = gameListItem;
