import React, {Component} from 'react';

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Dimensions
} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    alignItems: 'center',
    margin: 12,
    marginBottom: 24,
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gameContainer: {
    width: width * 0.66,
    padding: 12
  },
  gameId: {
    textAlign:'left',
    fontSize: 18
  },
  players: {
    flexDirection:'row'
  },
  turn: {
    flex: 1,
    textAlign:'right'
  }
});

class gameListItem extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    const game = this.props.game;
    const index = this.props.index;

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
      <View style={styles.container}>
        <View style={{flex:0.05}} />
        <View style={[styles.gameContainer, {backgroundColor: colors[index % 4]}]}>
          <Text style={styles.gameId}>game ID: {game.gameId}</Text>
          <View style={styles.players}>{players}</View>
          <Text style={styles.turn}>turn: {game.turn}</Text>
        </View>
      </View>
    )
  }
};

module.exports = gameListItem;
