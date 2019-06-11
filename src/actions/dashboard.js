import { SET_GAMES } from "./types";
import { SELECTED_GAME } from "./types";


export const setGames = games => dispatch => {
    dispatch({
        type: SET_GAMES,
        payload: games
    })
}
