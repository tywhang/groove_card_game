import React, { Component } from 'react';

const styles = {
  container: {
    borderWidth: 1,
    borderStyle: 'solid',
    margin: '4px',
    padding: '12px',
    display: 'inline-block'
  },
  innerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '60px',
    width: '60px'
  }
}

export default class Card extends Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.innerContainer}>
          <span>{ this.props.number }</span>
          <span>{ this.props.suit }</span>
        </div>
      </div>
    );
  }
}
