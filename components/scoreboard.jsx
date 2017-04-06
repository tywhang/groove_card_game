import React, { Component } from 'react';
import { connect } from 'react-redux'

class Scoreboard extends Component {
  formatPairs(pairs) {
    console.log(pairs);
    return pairs.map((pair) => {
      return (
        <p key={ `${pair[0].number}-${pair[0].suit}}` }>
          {pair[0].number}-{pair[0].suit} & {pair[1].number}-{pair[1].suit}
        </p>
      );
    });
  }

  render() {
    const { computerMatched, playerMatched, isPlayerTurn } = this.props;
    const isFinished = computerMatched.length === 26;

    return (
      <div style={{flex: 1}}>
        <h3>Turn: { isPlayerTurn ? 'Player' : 'Computer' }</h3>
        { isFinished && <h3>Congratulations. You found all the pairs!!!</h3> }
        <h4>Player Matched Pairs</h4>
        <h5>Total Pairs: { playerMatched.length }</h5>
        { this.formatPairs(playerMatched) }
        <h4>Computer Matched Pairs</h4>
        <h5>Total Pairs: { computerMatched.length }</h5>
        { this.formatPairs(computerMatched) }
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
