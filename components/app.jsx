import React, { Component } from 'react';
import { connect } from 'react-redux'

import Card from './card.jsx';
import { loadCards } from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const suits = ['Spade', 'Club', 'Diamond', 'Heart'];

    let cards = [];
    let counter = 1;
    numbers.forEach((number) => {
      suits.forEach((suit) => {
        cards.push({ id: counter, number, suit, revealed: false });
        counter++;
      });
    });

    this.props.loadCards(cards);
  }

  render() {
    const cards = this.props.cards.map((card, index) => {
      return <Card key={index} {...card} />;
    });
    return <div>{ cards }</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    cards: state.cards
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCards: (cards) => {
      dispatch(loadCards(cards))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
