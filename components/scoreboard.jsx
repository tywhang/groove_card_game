import React, { Component } from 'react';
import { connect } from 'react-redux'

class Scoreboard extends Component {
  render() {
    const { matched } = this.props;

    const pairs = matched.map((pair) => {
      return (
        <p key={ `${pair[0].number}-${pair[0].suit}}` }>
          {pair[0].number}-{pair[0].suit} & {pair[1].number}-{pair[1].suit}
        </p>
      );
    });

    return (
      <div style={{flex: 1}}>
        <h2>Matched Pairs</h2>
        <h5>Total Pairs: { matched.length }</h5>
        { pairs }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    matched: state.cards.matched
  }
}

export default connect(mapStateToProps)(Scoreboard)
