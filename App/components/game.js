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
      condition: true,
    }
  }

  _changeCard(newColor, newValue) {
    if (!this.state.condition) {
      this.setState({color: newColor, value: newValue});
      console.log('send through websocket: ');
    }
  }

  render() {
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

    if (this.state.condition) {
      optional =
      <PopUp style={styles.optional} title={'Play card or draw?'}
        actionA={() => {
          ws.send({
            route: 'drawCard',
            userId: ,
            gameId: ,
          })
          this.setState({condition: false});
        }}
        actionB={() => {
          console.log('play a card from hand: game - line 61');
          this.setState({condition: false});
        }}
        textA={'Draw new card'}
        textB={'Play card from hand'} />
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
