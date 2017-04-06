const card = (state = {}, action) => {
  switch (action.type) {
    case 'FLIP_CARD':
      if (state.id !== action.card.id) {
        return state;
      }
      return Object.assign({}, state, { revealed: true });

    case 'REMOVE_MATCHED_CARDS':
      if (state.revealed) {
        return Object.assign({}, state, { removed: true, revealed: false });
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

const cards = (state = { active: [], revealed: [], computerMatched: [], playerMatched: [], disabled: false, knownCards: [], isPlayerTurn: true }, action) => {
  switch (action.type) {
    case 'LOAD_CARDS':
      return Object.assign({}, state, { active: action.activeCards });

    case 'FLIP_CARD':
      const cardAlreadyFlipped = state.knownCards.findIndex((c) => { return c.id === action.card.id }) >= 0;
      const knownCards = cardAlreadyFlipped ? [...state.knownCards] : [...state.knownCards, action.card]
      knownCards.sort((a, b) => { return a.number === b.number ? 0 : a.number < b.number ? -1 : 1})

      return Object.assign({}, state, {
        active: state.active.map(c => card(c, action)),
        revealed: [...state.revealed, Object.assign({}, action.card, { revealed: true })],
        knownCards
      });

    case 'REMOVE_MATCHED_CARDS':
      const computerMatched = state.isPlayerTurn ? state.computerMatched : [...state.computerMatched, state.active.filter(c => c.id === state.revealed[0].id || c.id === state.revealed[1].id)]
      const playerMatched = !state.isPlayerTurn ? state.playerMatched : [...state.playerMatched, state.active.filter(c => c.id === state.revealed[0].id || c.id === state.revealed[1].id)]

      return Object.assign({}, state, {
        active: state.active.map(c => card(c, action)),
        revealed: [],
        computerMatched,
        playerMatched,
        disabled: false,
        knownCards: state.knownCards.filter(c => c.id !== state.revealed[0].id && c.id !== state.revealed[1].id)
      });

    case 'CONCEAL_CARDS':
      return Object.assign({}, state, {
        active: state.active.map(c => card(c, action)),
        revealed: [],
        disabled: false,
        isPlayerTurn: !state.isPlayerTurn
      });

    case 'DISABLE_CARDS':
      return Object.assign({}, state, { disabled: true });

    default:
      return state;
  }
}

export default cards;
