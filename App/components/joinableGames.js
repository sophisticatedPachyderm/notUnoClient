import React, {Component} from 'react';

import {
  Text,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

const GameListItem = require('./gameListItem');
const Game = require('./game');
const Button = require('./button');

// get style sheet from external
const styles = require('./styles/styles').openGames;

class openGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }
  }

  joinGame(gameId) {
    console.log(gameId, this.props.userId);
    fetch('https://notuno.herokuapp.com/api/game/joingame', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gameId: gameId,
        userId: this.props.userId,
      })
    })
    .then((response) => {
      this.props.navigator.pop();
    })
    .catch((err) => {
      console.log(err);
    });

  }
  render() {
    const joinableGames = this.props.joinableGames;
    let games;
    if (joinableGames.length === 0) {
      console.log('no available games');
    } else {
      games = joinableGames.map((game, index) => {
        return <GameListItem
          key={index}
          index={index}
          game={game}
          callback={this.joinGame.bind(this)}/>
      });
    }
    return (
      <View style={styles.container}>
        <View style={{flex:0.25}} />
        <Text style={styles.title}> Joinable Games </Text>
        <View style={styles.gameList}>
          {games}
        </View>
        <View style={{flex: 0.5}}></View>
      </View>
    )
  }
};

module.exports = openGames;
