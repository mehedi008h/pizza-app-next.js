import {
    NEW_PIZZA_REQUEST,
    NEW_PIZZA_SUCCESS,
    NEW_PIZZA_RESET,
    NEW_PIZZA_FAIL,
    ADMIN_PIZZA_REQUEST,
    ADMIN_PIZZA_SUCCESS,
    ADMIN_PIZZA_FAIL,

    CLEAR_ERRORS

} from '../constants/pizzaConstants';

export const newPizzaReducer = (state = { pizza: {} }, action) => {
    switch (action.type) {
        case NEW_PIZZA_REQUEST:
            return {
                loading: true
            }

        case NEW_PIZZA_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                pizza: action.payload.room
            }

        case NEW_PIZZA_RESET:
            return {
                success: false
            }

        case NEW_PIZZA_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const adminPizzaReducer = (state = { pizzas: [] }, action) => {
    switch (action.type) {

        case ADMIN_PIZZA_REQUEST:
            return {
                loading: true,
            }

        case ADMIN_PIZZA_SUCCESS:
            return {
                loading: false,
                pizzas: action.payload
            }

        case ADMIN_PIZZA_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}