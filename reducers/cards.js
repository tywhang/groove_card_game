const card = (state = {}, action) => {
  switch (action.type) {
    case 'FLIP_CARD':
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, { revealed: !state.revealed });
    default:
      return state;
  }
}

const cards = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_CARDS':
      return action.cards;
    case 'FLIP_CARD':
      return state.map(c => card(c, action));
    default:
      return state;
  }
}

export default cards;
