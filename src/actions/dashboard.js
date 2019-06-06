import { SET_GAMES } from "./types";
import { SELECTED_GAME } from "./types";


export const setGames = games => dispatch => {
    dispatch({
        type: SET_GAMES,
        payload: games
    })
}

export const setSelectedGame = game => dispatch => {
    // dispatch({
    //     type: SELECTED_GAME,
    //     payload: game
    // })
}