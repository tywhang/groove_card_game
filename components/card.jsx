import React, { Component } from 'react';
import { connect } from 'react-redux'

import { flipCard } from '../actions';

const styles = {
  container: {
    borderWidth: 1,
    borderStyle: 'solid',
    cursor: 'pointer',
    margin: '4px',
    padding: '12px',
    display: 'inline-block',
    height: '60px',
    width: '60px'
  },
  innerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }
}

class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.container} onClick={this.props.flipCard.bind(this, this.props.id)}>
        <div style={styles.innerContainer}>
          { this.props.revealed ?
            <span>{ this.props.number } { this.props.suit }</span> :
            <span>?</span>
          }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    flipCard: (id) => {
      dispatch(flipCard(id))
    }
  }
}

export default connect(null, mapDispatchToProps)(Card);
