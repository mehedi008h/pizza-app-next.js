import {
    ALL_PIZZA_REQUEST,
    ALL_PIZZA_SUCCESS,
    ALL_PIZZA_FAIL,
    NEW_PIZZA_REQUEST,
    NEW_PIZZA_SUCCESS,
    NEW_PIZZA_RESET,
    NEW_PIZZA_FAIL,
    ADMIN_PIZZA_REQUEST,
    ADMIN_PIZZA_SUCCESS,
    ADMIN_PIZZA_FAIL,
    PIZZA_DETAILS_SUCCESS,
    PIZZA_DETAILS_FAIL,
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

export const allPizzaReducer = (state = { pizzas: [] }, action) => {
    switch (action.type) {

        case ALL_PIZZA_REQUEST:
            return {
                loading: true,
            }

        case ALL_PIZZA_SUCCESS:
            return {
                loading: false,
                pizzas: action.payload
            }

        case ALL_PIZZA_FAIL:
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

// get all pizza - ADMIN

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

// Pizza details reducer
export const pizzaDetailsReducer = (state = { pizza: {} }, action) => {
    switch (action.type) {
        case PIZZA_DETAILS_SUCCESS:
            return {
                pizza: action.payload
            }

        case PIZZA_DETAILS_FAIL:
            return {
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

export const pizzaReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PIZZA_REQUEST:
        case DELETE_PIZZA_REQUEST:
            return {
                loading: true
            }

        case UPDATE_PIZZA_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_PIZZA_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_PIZZA_RESET:
            return {
                isUpdated: false
            }

        case DELETE_PIZZA_RESET:
            return {
                loading: false,
                isDeleted: false
            }

        case UPDATE_PIZZA_FAIL:
        case DELETE_PIZZA_FAIL:
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