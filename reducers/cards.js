const card = (state = {}, action) => {
  switch (action.type) {
    case 'FLIP_CARD':
      if (state.id !== action.card.id) {
        return state;
      }
      return Object.assign({}, state, { revealed: !state.revealed });
    case 'REMOVE_MATCHED_CARDS':
      if (state.revealed) {
        return Object.assign({}, state, { removed: true, revealed: false })
      }
    case 'CONCEAL_CARDS':
      if (state.revealed) {
        return Object.assign({}, state, { revealed: false });
      }
      return state;
    default:
      return state;
  }
}

const cards = (state = { active: [], revealed: [], matched: [] }, action) => {
  switch (action.type) {
    case 'LOAD_CARDS':
      return Object.assign({}, state, { active: action.activeCards });

    case 'FLIP_CARD':
      return Object.assign({}, state, {
        active: state.active.map(c => card(c, action)),
        revealed: [...state.revealed, Object.assign({}, action.card, { revealed: true })]
      });

    case 'REMOVE_MATCHED_CARDS':
      return Object.assign({}, state, {
        active: state.active.map(c => card(c, action)),
        revealed: [],
        matched: [...state.matched, state.active.filter(c => c.id === state.revealed[0].id || c.id === state.revealed[1].id)]
      });

    case 'CONCEAL_CARDS':
      return Object.assign({}, state, { active: state.active.map(c => card(c, action)), revealed: [] });
    default:
      return state;
  }
}

export default cards;
