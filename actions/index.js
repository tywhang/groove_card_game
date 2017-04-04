export const flipCard = (id) => {
  return {
    type: 'FLIP_CARD',
    id
  }
}

export const loadCards = (cards) => {
  return {
    type: 'LOAD_CARDS',
    cards
  }
}