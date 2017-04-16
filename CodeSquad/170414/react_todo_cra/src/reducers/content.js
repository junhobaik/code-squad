import * as types from '../actions/ActionTypes';

let initialState = {
  title : "My GameList",
  gamelist : ['default 01']
};

export default function content(state = initialState, action){
  switch(action.type) {
    case types.ADD_GAME:
      return {...state, gamelist : [...state.gamelist, action.value]} 
    default: 
      return state;
  }
}