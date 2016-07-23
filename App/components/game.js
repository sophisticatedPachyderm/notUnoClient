import React, {Component} from 'react';

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  ScrollView
} from 'react-native';

const Card = require('./card');
const PopUp = require('./popup');
const ws = require('../../socket/socketUtil');

// get style sheet from external
const styles = require('./styles/styles').game;

class game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCard: '',
      color: '#fff',
      value: '',
      mustChooseAction: true,
    }
  }

  _changeCard(newColor, newValue) {
    if (!this.state.condition) {
      this.setState({color: newColor, value: newValue});
      console.log('send through websocket: ');
    }
  }

  render() {
    console.log(this.props.userId, +this.props.gameId);
    let items;
    if (this.props.hand !== 0) {
      items = this.props.hand.map((card, index) => {
        return <Card
          key={index}
          color={card[1]}
          value={card[0]}
          changeCard={this._changeCard.bind(this)}/>;
      });
    }

    let optional;

    if (this.state.mustChooseAction) {
      optional =
      <PopUp style={styles.optional} title={'Play card or draw?'}
        textA={'Draw new card'}
        actionA={() => {
          ws.send(JSON.stringify({
            route: 'drawCard',
            userId: this.props.userId,
            gameId: +this.props.gameId,
          }));
          // this will also need to act on the response that the server sends
          this.setState({mustChooseAction: false});
        }}
        textB={'Play card from hand'}
        actionB={() => {
          console.log('play a card from hand: game - line 61');
          // This will let the player choose a card they currently have to play
          this.setState({mustChooseAction: false});
        }} />
    }

    return (
      <View style={styles.container}>
        <View style={{flex:0.25}} />
        <View style={[styles.main, {backgroundColor: this.state.color}]}>
          <Text style={[styles.label, {color: '#fff'}]}>
            {this.state.value}
          </Text>
          {optional}
        </View>
        <ScrollView style={styles.hand} horizontal={true}>
          {items}
        </ScrollView>
      </View>
    );
  }

};

module.exports = game;
