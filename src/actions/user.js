import { SET_USER } from "./types"

 
export const setUser = user => dispatch => {
    console.log(user)
    dispatch({
       type: SET_USER,
       payload: user 
    })
}