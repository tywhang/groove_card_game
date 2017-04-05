const game = (state = { isPlayerTurn: true }, action) => {
  switch (action.type) {
    case 'CONCEAL_CARDS':
      return Object.assign({}, state, { isPlayerTurn: !state.isPlayerTurn });
    default:
      return state;
  }
}

export default game;
