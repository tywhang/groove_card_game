import React, { Component } from 'react';
import Card from './card.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const suits = ['Spade', 'Club', 'Diamond', 'Heart'];

    let cards = [];
    numbers.forEach((number) => {
      suits.forEach((suit) => {
        cards.push({ number, suit })
      });
    });

    this.setState({ cards });
  }

  render() {
    const cards = this.state.cards.map((card, index) => {
      return <Card key={index} {...card} />;
    });
    return <div>{ cards }</div>;
  }
}
