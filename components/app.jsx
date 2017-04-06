import React, { Component } from 'react';
import { connect } from 'react-redux'

import { loadCards, removeMatchedCards, concealCards, disableCards, flipCard } from '../actions';
import Card from './card.jsx';
import Scoreboard from './scoreboard.jsx';

let counter = 0;
let storedMove;

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadCards();
  }

  componentDidUpdate() {
    const { revealedCards, isPlayerTurn } = this.props;
    if (revealedCards.length === 2) {
      this.props.disableCards();
      if (revealedCards[0].number == revealedCards[1].number) {
        setTimeout(this.props.removeMatchedCards, 1000);
      } else {
        setTimeout(this.props.concealCards, 1000);
      }
    } else if (!isPlayerTurn) { this.computerMove() }
  }

  computerMove() {
    const { revealedCards, knownCards } = this.props;
    let foundMatch = false;

    if (revealedCards.length === 0) {
      for (var i = 0; i < knownCards.length - 1; i++) {
        if (knownCards[i].number === knownCards[i + 1].number) {
          foundMatch = true;
          setTimeout(((i) => this.props.flipCard(knownCards[i])).bind(null, i), 1000);
          storedMove = knownCards[i + 1];
          break;
        }
      }

      if (!foundMatch) { this.clickRandom(); }
    } else {
      if (storedMove) {
        setTimeout(((storedMove) => this.props.flipCard(storedMove)).bind(null, storedMove), 1000);
        storedMove = null;
      } else {
        for (var i = 0; i < knownCards.length; i++) {
          if (revealedCards[0].number === knownCards[i].number && revealedCards[0].suit !== knownCards[i].suit) {
            foundMatch = true;
            setTimeout(((c) => this.props.flipCard(c)).bind(null, knownCards[i]), 1000);
            break;
          }
        };

        if (!foundMatch) { this.clickRandom(); }
      }
    }
  }

  clickRandom() {
    const onBoard = this.props.activeCards.filter(c => !c.removed)
    const random = Math.floor(Math.random() * onBoard.length);
    setTimeout(((random) => this.props.flipCard(this.props.activeCards[random])).bind(null, random), 1000);
  }

  render() {
    const activeCards = this.props.activeCards.map((card, index) => {
      return <Card key={index} {...card} />;
    });
    return (
      <div style={{display: 'flex'}}>
        <Scoreboard />
        <div style={{flex: 3, display: 'flex', flexWrap: 'wrap'}}>{ activeCards }</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeCards: state.cards.active,
    revealedCards: state.cards.revealed,
    matchedCards: state.cards.matched,
    knownCards: state.cards.knownCards,
    isPlayerTurn: state.cards.isPlayerTurn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCards: (cards) => { dispatch(loadCards(cards)) },
    removeMatchedCards: () => { dispatch(removeMatchedCards()) },
    concealCards: () => { dispatch(concealCards()) },
    disableCards: () => { dispatch(disableCards()) },
    flipCard: (card) => { dispatch(flipCard(card)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
