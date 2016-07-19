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

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: width,
  },
  main: {
    flex: 3,
    width: width * 1,
    justifyContent: 'center',
  },
  hand: {
    flex: 1,
    width: width,
    backgroundColor: '#555'
  },
  label: {
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 72
  },
  optional: {
    justifyContent: 'center',
    margin: width * 0.1,
  }
});

class game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCard: '',
      color: '#555',
      value: '',
      condition: true
    }
  }

  _broadcastChoice(choice) {
    // here is where the socket request will go
    console.log('shout to the world!: ',choice);
  }

  _changeCard(newColor, newValue) {
    if (!this.state.condition) {
      this.setState({color: newColor, value: newValue});
      // I also want to remove the card here by splicing it out of the hand array
      this._broadcastChoice({color: newColor, value: newValue});
    }
  }

  render() {
    const cards = this.props.cards;

    let items = cards.map((card, index) => {
      return <Card key={index} color={card[1]} value={card[0]} changeCard={this._changeCard.bind(this)}/>;
    });

    let optional;

    if (this.state.condition) {
      optional =
      <PopUp style={styles.optional} title={'Play card or draw?'}
        actionA={() => {
          console.log('a');
          this.setState({condition: false});
        }}
        actionB={() => {
          console.log('b');
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
        </View>
        {optional}
        <ScrollView style={styles.hand} horizontal={true}>
          {items}
        </ScrollView>
      </View>
    );
  }
};

module.exports = game;
