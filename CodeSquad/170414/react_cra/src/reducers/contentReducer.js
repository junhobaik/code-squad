let initialState = {
  title : "My GameList",
  gamelist : []
};

const contentReducer = (state = initialState, action) => {
   
  switch(action.type) {
    case 'ADD_GAME':
      return {...state, gamelist : [...state.gamelist, action.value]};
    default: 
      return state;
  }
}

export default contentReducer;