import React, { Component } from 'react';
import { connect } from 'react-redux'

import Card from './card.jsx';
import { loadCards, removeMatchedCards } from '../actions';

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
        // this.props.concealCards();
      }
    }
  }

  render() {
    const activeCards = this.props.activeCards.map((card, index) => {
      return <Card key={index} {...card} />;
    });
    return <div>{ activeCards }</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    activeCards: state.cards.active,
    revealedCards: state.cards.revealed
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCards: (cards) => { dispatch(loadCards(cards)) },
    removeMatchedCards: () => { dispatch(removeMatchedCards()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
