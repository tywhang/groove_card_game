export const flipCard = (card) => {
  return {
    type: 'FLIP_CARD',
    card
  }
}

export const loadCards = () => {
  const numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const suits = ['Spade', 'Club', 'Diamond', 'Heart'];

  let activeCards = [];
  let counter = 0;
  numbers.forEach((number) => {
    suits.forEach((suit) => {
      activeCards.push({ id: counter, number, suit, revealed: false });
      counter++;
    });
  });

  return {
    type: 'LOAD_CARDS',
    activeCards
  }
}

export const removeMatchedCards = () => {
  return {
    type: 'REMOVE_MATCHED_CARDS'
  }
}