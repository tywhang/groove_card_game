import React, { Component } from 'react';
import { connect } from 'react-redux'

import { loadCards, removeMatchedCards, concealCards, disableCards } from '../actions';
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
      this.props.disableCards();
      if (revealedCards[0].number == revealedCards[1].number) {
        setTimeout(this.props.removeMatchedCards, 1000);
      } else {
        setTimeout(this.props.concealCards, 1000);
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
    matchedCards: state.cards.matched
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCards: (cards) => { dispatch(loadCards(cards)) },
    removeMatchedCards: () => { dispatch(removeMatchedCards()) },
    concealCards: () => { dispatch(concealCards()) },
    disableCards: () => { dispatch(disableCards()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
