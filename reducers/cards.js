const card = (state = {}, action) => {
  switch (action.type) {
    case 'FLIP_CARD':
      if (state.id !== action.card.id) {
        return state;
      }
      return Object.assign({}, state, { revealed: !state.revealed });
    default:
      return state;
  }
}

const cards = (state = { active: [], revealed: [], matched: [] }, action) => {
  switch (action.type) {
    case 'LOAD_CARDS':
      return Object.assign({}, state, { active: action.activeCards });
    case 'FLIP_CARD':
      state.revealed.push(Object.assign({}, action.card, { revealed: true }));
      return Object.assign({}, state, { active: state.active.map(c => card(c, action)) });
    case 'REMOVE_MATCHED_CARDS':
      const active = state.active.filter(c => c.id !== state.revealed[0].id && c.id !== state.revealed[1].id)
      state.matched.push(state.active.filter(c => c.id !== state.revealed[0].id && c.id !== state.revealed[1].id))
      return Object.assign({}, state, { active, revealed: [] })
    default:
      return state;
  }
}

export default cards;
