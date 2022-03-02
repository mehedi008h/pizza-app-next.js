import { GET_TO_CART, ADD_TO_CART, REMOVE_ITEM_CART, SAVE_SHIPPING_INFO } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
    switch (action.type) {
        case GET_TO_CART:
            return {
                cartItems: action.payload
            }
        case ADD_TO_CART:
            const item = action.payload;
            const isItemExist = state.cartItems.find(i => i.id === item.id)

            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.id === isItemExist.id ? item : i)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case REMOVE_ITEM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(i => i.id !== action.payload)
            }


        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            }


        default:
            return state
    }
}