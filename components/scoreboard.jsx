import React, { Component } from 'react';
import { connect } from 'react-redux'

const styles = {
  container: {
    backgroundColor: 'white',
    border: '1px solid black',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    marginRight: '4rem',
    padding: '1rem'
  },
  turn: {
    alignItems: 'center',
    display: 'flex'
  },
  turnIndicator: {
    border: '1px solid black',
    flex: 1,
    marginLeft: '1rem',
    padding: '0.75rem',
  },
  endGameMessage: {
    textAlign: 'center',
    color: 'blue'
  },
  pairsHeader: { textAlign: 'center' },
  pairsContainer: { display: 'flex' },
  pairsSection: {
    flex: 1,
    textAlign: 'center',
    overflowY: 'auto'
  }
}

class Scoreboard extends Component {
  renderSuit(suit) {
    switch (suit) {
      case 'Spade':
        return '\u2660';
      case 'Club':
        return '\u2663';
      case 'Diamond':
        return '\u2666';
      case 'Heart':
        return '\u2665';
    }
  }

  renderBlackOrRed(suit) {
    return suit === 'Diamond' || suit === 'Heart' ? { color: 'red' } : { color: 'black' };
  }

  renderCard(card) {
    return <span style={ this.renderBlackOrRed(card.suit) }>{card.number} {this.renderSuit(card.suit)}</span>;
  }

  formatPairs(pairs) {
    return pairs.map((pair) => {
      return (
        <p key={ `${pair[0].number}-${pair[0].suit}}` }>
          {this.renderCard(pair[0])} {this.renderCard(pair[1])}
        </p>
      );
    });
  }

  endGameMessage() {
    const { computerMatched, playerMatched } = this.props;

    if (computerMatched.length > playerMatched.length) return 'Computer Won'
    if (computerMatched.length < playerMatched.length) return 'Player Won';
    return 'The game ended in a tie'
  }

  render() {
    const { computerMatched, playerMatched, isPlayerTurn } = this.props;
    const isFinished = computerMatched.length + playerMatched.length === 26;

    return (
      <div style={styles.container}>
        <h3 style={styles.turn}>Turn:
          <span style={styles.turnIndicator}>{ isPlayerTurn ? 'Player' : 'Computer' }</span>
        </h3>
        <h3 style={styles.endGameMessage}>{ isFinished && this.endGameMessage() }</h3>
        <h3 style={styles.pairsHeader}>Matched Pairs</h3>
        <div style={styles.pairsContainer}>
          <div style={styles.pairsSection}>
            <h4>Player</h4>
            <h5>Total Pairs: { playerMatched.length }</h5>
            { this.formatPairs(playerMatched) }
          </div>
          <div style={styles.pairsSection}>
            <h4>Computer</h4>
            <h5>Total Pairs: { computerMatched.length }</h5>
            { this.formatPairs(computerMatched) }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    computerMatched: state.cards.computerMatched,
    playerMatched: state.cards.playerMatched,
    isPlayerTurn: state.cards.isPlayerTurn
  }
}

export default connect(mapStateToProps)(Scoreboard)
