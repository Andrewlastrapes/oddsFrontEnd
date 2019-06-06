import { SET_USER } from "../actions/types";
const initialState = [];

export default function(state = initialState, action){
    console.log(action)
    const { type, payload } = action
    switch(type){
        case SET_USER:
            return [...state, payload]
        default:
            return state;  
    }
    
}