import axios from 'axios';
import absoluteUrl from 'next-absolute-url';

import {
    NEW_PIZZA_REQUEST,
    NEW_PIZZA_SUCCESS,
    NEW_PIZZA_FAIL,
    ADMIN_PIZZA_REQUEST,
    ADMIN_PIZZA_SUCCESS,
    ADMIN_PIZZA_FAIL,
    UPDATE_PIZZA_REQUEST,
    UPDATE_PIZZA_SUCCESS,
    UPDATE_PIZZA_RESET,
    UPDATE_PIZZA_FAIL,
    DELETE_PIZZA_REQUEST,
    DELETE_PIZZA_SUCCESS,
    DELETE_PIZZA_RESET,
    DELETE_PIZZA_FAIL,

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

// Get all pizza - ADMIN
export const getAdminPizza = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_PIZZA_REQUEST })

        const { data } = await axios.get(`/api/admin/pizza`)

        dispatch({
            type: ADMIN_PIZZA_SUCCESS,
            payload: data.pizza
        })

    } catch (error) {

        console.log(error);

        dispatch({
            type: ADMIN_PIZZA_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updatePizza = (id, pizzaData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PIZZA_REQUEST })

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/pizza/${id}`, pizzaData, config)

        dispatch({
            type: UPDATE_PIZZA_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PIZZA_FAIL,
            payload: error.response.data.message
        })
    }
}


export const deletePizza = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_PIZZA_REQUEST })

        const { data } = await axios.delete(`/api/pizza/${id}`)

        dispatch({
            type: DELETE_PIZZA_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_PIZZA_FAIL,
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