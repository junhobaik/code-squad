//import { INCREMENT, DECREMENT, SET_COLOR } from './ActionTypes'
import * as types from './ActionTypes';

export function addGame(value){
    return {
        type : types.ADD_GAME,
        value : value
    }
}