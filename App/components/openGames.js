import React, {Component} from 'react';

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

const GameListItem = require('./gameListItem')

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    alignItems: 'center',
    flex: 0.15
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',

  },
  gameList: {
    flex: 1,
  }
});

class openGames extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let games = this.props.openGames.map((game, index) => {
      return <GameListItem key={index} index={index} game={game} />

    });

    return (
      <View style={styles.container}>
        <View style={{flex:0.15}} />
        <Text style={styles.title}> Your Open Games </Text>
        <View style={styles.gameList}>
          {games}
        </View>
        <View style={{flex: 0.5}}></View>
      </View>
    )
  }
};

module.exports = openGames;
