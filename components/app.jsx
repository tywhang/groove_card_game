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

    // If first move,
    if (revealedCards.length === 0) {
      // Check if there are matches in 'known' list.
      for (var i = 0; i < knownCards.length - 1; i++) {
        // If true, call one and store the next.
        if (knownCards[i].number === knownCards[i + 1].number) {
          foundMatch = true;
          this.props.flipCard(knownCards[i]);
          storedMove = knownCards[i + 1];
          break;
        }
      }

      // If not, click on random card that's not removed.
      if (!foundMatch) {
        setTimeout(() => this.props.flipCard(this.props.activeCards[counter]), 1000)
        counter += 4;
      }
    }
    // If second move,
    else {
      // If stored move, do that move.
      if (storedMove) {
        this.props.flipCard(storedMove);
        storedMove = null;
      } else {
        // Check if first card matches with any in the 'known' list.
        // Else click on a random card that's not removed.
        setTimeout(() => this.props.flipCard(this.props.activeCards[counter]), 1000)
        counter += 4;
      }
    }
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
    isPlayerTurn: state.game.isPlayerTurn
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
