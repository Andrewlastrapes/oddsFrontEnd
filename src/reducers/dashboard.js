
import { SET_GAMES, SELECTED_GAME } from "../actions/types";
const initialState = [];

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch(type){
        case SET_GAMES:
            return [...state, payload]
            
        default:
            return state;
    }
} 