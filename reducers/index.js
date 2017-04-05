import { combineReducers } from 'redux';
import cards from './cards';
import game from './game';

const cardApp = combineReducers({
  cards,
  game
});

export default cardApp
