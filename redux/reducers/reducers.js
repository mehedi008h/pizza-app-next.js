import { combineReducers } from 'redux';
import { cartReducer } from './cartReducers';
import { adminPizzaReducer, allPizzaReducer, newPizzaReducer, pizzaDetailsReducer, pizzaReducer } from './pizzaReducers';
import { authReducer, loadedUserReducer, userReducer } from './userReducers';

const reducer = combineReducers({
    auth: authReducer,
    loadedUser: loadedUserReducer,
    user: userReducer,
    allPizza: allPizzaReducer,

    newPizza: newPizzaReducer,
    adminPizza: adminPizzaReducer,
    pizzaDetails: pizzaDetailsReducer,
    pizza: pizzaReducer,

    cart: cartReducer
})

export default reducer;