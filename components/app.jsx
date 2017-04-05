import React, { Component } from 'react';
import { connect } from 'react-redux'

import { loadCards, removeMatchedCards, concealCards } from '../actions';
import Card from './card.jsx';
import Scoreboard from './scoreboard.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadCards();
  }

  componentDidUpdate() {
    const { revealedCards } = this.props;
    if (revealedCards.length === 2) {
      if (revealedCards[0].number == revealedCards[1].number) {
        this.props.removeMatchedCards();
      } else {
        this.props.concealCards();
      }
    }
  }

  render() {
    const activeCards = this.props.activeCards.map((card, index) => {
      return <Card key={index} {...card} />;
    });
    return (
      <div style={{display: 'flex'}}>
        <div style={{flex: 3}}>{ activeCards }</div>
        <Scoreboard />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeCards: state.cards.active,
    revealedCards: state.cards.revealed,
    matchedCards: state.cards.matched
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCards: (cards) => { dispatch(loadCards(cards)) },
    removeMatchedCards: () => { dispatch(removeMatchedCards()) },
    concealCards: () => { dispatch(concealCards()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
