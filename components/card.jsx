import React, { Component } from 'react';

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

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { covered: true };
  }

  flip() {
    this.setState({ covered: !this.state.covered });
  }

  render() {
    return (
      <div style={styles.container} onClick={this.flip.bind(this)}>
        <div style={styles.innerContainer}>
          { this.state.covered ?
            <span>?</span> :
            <span>{ this.props.number } { this.props.suit }</span>
          }
        </div>
      </div>
    );
  }
}
