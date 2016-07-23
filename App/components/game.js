import React, {Component} from 'react';

import {
  Text,
  View,
  ScrollView
} from 'react-native';

const Card = require('./card');
const PopUp = require('./popup');
const OppView = require('./opponentView');

const wsInit = require('../../socket/socketUtil');

// get style sheet from external
const styles = require('./styles/styles').game;

const colorConverter = {
  b: '#2196F3',
  g: '#4CAF50',
  r: '#F44336',
  y: '#FFEB3B',
}

class game extends Component {
  constructor(props) {
    super(props);

    let ws = wsInit(props.userId,

      //these are routes to be passed to websocket
      {
        myTurnResponse: {
          mines: (response) => { console.log('My move, server response:', response.response); },
          opponent: this.opponentPlayCard.bind(this)
        },

        drawCardResponse: {
          mines: this.myTurnDraw.bind(this),
          opponent: this.opponentDrawCard.bind(this)
        }
      }
    );

    this.state = {
      currentCard: this.props.currentCard,
      mustChooseAction: true,
      ws: ws,
      hand: this.props.hand,
      topPlayerHand: this.props.players.topPlayer,
      leftPlayerHand: this.props.players.leftPlayer,
      rightPlayerHand: this.props.players.rightPlayer,

    };


  }

  getPlayerFromId(userId) {
    for (let k in this.props.players) {
      let player = this.props.players[k];
      if (player !== null && player.userId === userId) {
        return player;
      }
    }
    return undefined;
  }

  myTurnDraw(response) {
    let temp = this.state.hand.slice();
    temp.push(response.cardDrawn);
    this.setState({hand: temp});
  }

  opponentDrawCard(response) {
    //handle any animations and state changes here
    console.log('opponent draws card', response);
    //this is the player that drew the card
    let player = this.getPlayerFromId(response.userId);
  }

  opponentPlayCard(response) {
    //handle any animations and state changes here
    console.log(response);
    //this is the player that played the card
    let player = this.getPlayerFromId(response.userId);

    let cardPlayed = response.cardPlayed;

    if (response.gameOver === true) {
      //someone else won! Boo hoo

    } else if (response.currentPlayer === this.props.myPosition) {
      //its my turn now!

      if (cardPlayed[0] === 'takeTwo' || cardPlayed[0] === 'takeFour') { //then i just drew cards...
      //look at the last 4 cards in my new hand, and that will tell me what i just drew
        let myNewHand = response.nextHand;
      }
    } else {
      //someone else's turn

    }
  }

  changeCard(newCard, index) {
    this.setState({currentCard: newCard});
    console.log('send through websocket: ');
    // send the chosen one through the websocket
    this.state.ws.send(JSON.stringify({
      userId: this.props.userId,
      gameId: this.props.gameId,
      cardIndex: index,
      route: 'myTurn',
    }));
  }

  render() {
    let cardsArray;
    // if there are cards to render put them in the items variabe
    if (this.props.hand !== 0) {
      cardsArray = this.props.hand.map((card, index) => {
        return <Card
          key={index}
          card={card}
          index={index}
          changeCard={this.changeCard.bind(this)}
          colors={colorConverter}/>;
      });
    }

    let optional;

    if (this.state.mustChooseAction) {
      optional =
      <PopUp style={styles.optional} title={'Play card or draw?'}
        textA={'Draw new card'}
        actionA={() => {
          this.state.ws.send(JSON.stringify({
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
    console.log(this.state.topPlayer)
    return (
      <View style={styles.container}>
        <View style={{flex:0.25}} />
        <View style={[styles.main, {backgroundColor: colorConverter[this.state.currentCard[1]]}]}>
          <OppView player={this.state.topPlayerHand} loc={'top'}/>
          <OppView player={this.state.leftPlayerHand} loc={'left'}/>
          <OppView player={this.state.rightPlayerHand} loc={'right'}/>
          <Text style={[styles.label, {color: '#fff'}]}>
            {this.state.currentCard[0]}
          </Text>
          {optional}
        </View>
        <ScrollView style={styles.hand} horizontal={true}>
          {cardsArray}
        </ScrollView>
      </View>
    );
  }

};

module.exports = game;
