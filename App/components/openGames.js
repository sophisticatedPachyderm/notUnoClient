import React, {Component} from 'react';

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

const GameListItem = require('./gameListItem');
const Game = require('./game');

// get style sheet from external
const styles = require('./styles/styles').openGames;

class openGames extends Component {
  constructor(props) {
    super(props);
    this.state ={
      games: this.props.openGames
    }
    this.chooseGame = this.chooseGame.bind(this);
  }

  chooseGame(game) {
    this.props.navigator.push({
      title: 'game',
      component: Game,
      passProps: {cards: this.props.cards},
    });
  }

  render() {
    let games = this.props.openGames.map((game, index) => {
      return <GameListItem key={index} index={index} game={game} chooseGame={this.chooseGame}/>
    });

    return (
      <View style={styles.container}>
        <View style={{flex:0.25}} />
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
