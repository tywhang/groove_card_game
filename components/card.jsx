import React, { Component } from 'react';
import { connect } from 'react-redux'

import { flipCard } from '../actions';

const styles = {
  container: {
    borderWidth: 1,
    borderStyle: 'solid',
    cursor: 'pointer',
    margin: '4px',
    padding: '12px'
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '60px',
    width: '60px'
  }
}

class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.container}>
        { this.props.removed ?
          <div style={styles.inner}></div> :
          <div style={styles.inner} onClick={this.props.flipCard.bind(this, this.props)}>
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

const mapDispatchToProps = (dispatch) => {
  return {
    flipCard: (card) => {
      dispatch(flipCard(card))
    }
  }
}

export default connect(null, mapDispatchToProps)(Card);
