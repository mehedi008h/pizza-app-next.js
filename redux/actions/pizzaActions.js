import axios from 'axios';
import absoluteUrl from 'next-absolute-url';

import {
    NEW_PIZZA_REQUEST,
    NEW_PIZZA_SUCCESS,
    NEW_PIZZA_FAIL,

    CLEAR_ERRORS

} from '../constants/pizzaConstants';

// new pizza
export const newPizza = (pizzaData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PIZZA_REQUEST })

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/pizza`, pizzaData, config);

        dispatch({
            type: NEW_PIZZA_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_PIZZA_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}