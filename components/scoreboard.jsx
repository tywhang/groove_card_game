import React, { Component } from 'react';
import { connect } from 'react-redux'

class Scoreboard extends Component {
  formatPairs(pairs) {
    return pairs.map((pair) => {
      return (
        <p key={ `${pair[0].number}-${pair[0].suit}}` }>
          {pair[0].number}-{pair[0].suit} & {pair[1].number}-{pair[1].suit}
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
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', padding: '0 1rem', backgroundColor: 'white', border: '1px solid black', marginRight: '4rem'}}>
        <h3>Turn: { isPlayerTurn ? 'Player' : 'Computer' }</h3>
        <h3>{ isFinished && this.endGameMessage() }</h3>
        <div style={{flex: 1}}>
          <h4>Player Matched Pairs</h4>
          <h5>Total Pairs: { playerMatched.length }</h5>
          { this.formatPairs(playerMatched) }
        </div>
        <div style={{flex: 1}}>
          <h4>Computer Matched Pairs</h4>
          <h5>Total Pairs: { computerMatched.length }</h5>
          { this.formatPairs(computerMatched) }
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
