import React, { Component } from 'react';
import { connect } from 'react-redux'

import { flipCard } from '../actions';

const styles = {
  container: {
    borderWidth: 1,
    borderStyle: 'solid',
    cursor: 'pointer',
    margin: '4px'
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '60px',
    width: '60px',
    padding: '12px'
  }
}

class Card extends Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    const { disabled, isPlayerTurn, revealed } = this.props;

    if (disabled || !isPlayerTurn || revealed) return;
    console.log(this.props);
    this.props.flipCard(this.props);
  }

  render() {
    return (
      <div style={styles.container}>
        { this.props.removed ?
          <div style={styles.inner} /> :
          <div style={styles.inner} onClick={ this.handleClick.bind(this) }>
            { this.props.revealed ?
              <span>{ this.props.number } { this.props.suit }</span> :
              <span>?</span>
            }
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    disabled: state.cards.disabled,
    isPlayerTurn: state.cards.isPlayerTurn
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    flipCard: (card) => { dispatch(flipCard(card)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
