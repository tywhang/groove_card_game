import React, { Component } from 'react';
import { connect } from 'react-redux'

import { flipCard } from '../actions';

const styles = {
  container: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
    cursor: 'pointer',
    margin: '4px',
    height: '84px',
    width: '72px'
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative',
    height: '84px',
    width: '72px'
  }
}

class Card extends Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    const { disabled, isPlayerTurn, revealed } = this.props;

    if (disabled || !isPlayerTurn || revealed) return;
    this.props.flipCard(this.props);
  }

  renderBlackOrRed() {
    return this.props.suit === 'Diamond' || this.props.suit === 'Heart' ? { color: 'red' } : { color: 'black' };
  }

  renderSuit() {
    switch (this.props.suit) {
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

  render() {
    return (
      <div style={styles.container} onClick={ this.handleClick.bind(this) }>
        { this.props.removed ?
          <div style={styles.inner} /> :
          <div style={styles.inner}>
            { this.props.revealed ?
              <div style={ this.renderBlackOrRed() }>
                <span style={{position: 'absolute', top: '2px', left: '2px'}}>{ this.renderSuit() }</span>
                <span style={{fontSize: '24px'}}>{ this.props.number }</span>
                <span style={{position: 'absolute', bottom: '2px', right: '2px'}}>{ this.renderSuit() }</span>
              </div> :
              <div style={styles.inner}>
                <span>?</span>
              </div>
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
