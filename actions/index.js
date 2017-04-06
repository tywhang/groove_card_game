function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export const flipCard = (card) => {
  return {
    type: 'FLIP_CARD',
    card
  };
}

export const loadCards = () => {
  const numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const suits = ['Spade', 'Club', 'Diamond', 'Heart'];

  let activeCards = [];
  let counter = 0;
  numbers.forEach((number) => {
    suits.forEach((suit) => {
      activeCards.push({ id: counter, number, suit, revealed: false, removed: false });
      counter++;
    });
  });
  // activeCards = shuffleArray(activeCards);

  return {
    type: 'LOAD_CARDS',
    activeCards
  };
}

export const removeMatchedCards = () => {
  return { type: 'REMOVE_MATCHED_CARDS' };
}

export const concealCards = () => {
  return { type: 'CONCEAL_CARDS' };
}

export const disableCards = () => {
  return { type: 'DISABLE_CARDS' };
}
