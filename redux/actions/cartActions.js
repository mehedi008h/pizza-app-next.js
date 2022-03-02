import axios from 'axios';
import { ADD_TO_CART, REMOVE_ITEM_CART, SAVE_SHIPPING_INFO } from '../constants/cartConstants';

export const addItemToCart = (pizza) => async (dispatch, getState) => {
    // const { data } = await axios.get(`/api/pizza/${id}`)

    dispatch({
        type: ADD_TO_CART,
        payload: {
            id: pizza._id,
            title: pizza.title,
            price: pizza.price,
            image: pizza.image,
            quantity: pizza.quantity,
            extras: pizza.extras
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeItemFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_ITEM_CART,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const saveShippingInfo = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    })

    localStorage.setItem('shippingInfo', JSON.stringify(data))

}