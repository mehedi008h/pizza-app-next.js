import { combineReducers } from 'redux';
import { adminPizzaReducer, newPizzaReducer, pizzaDetailsReducer, pizzaReducer } from './pizzaReducers';
import { authReducer, loadedUserReducer, userReducer } from './userReducers';

const reducer = combineReducers({
    auth: authReducer,
    loadedUser: loadedUserReducer,
    user: userReducer,

    newPizza: newPizzaReducer,
    adminPizza: adminPizzaReducer,
    pizzaDetails: pizzaDetailsReducer,
    pizza: pizzaReducer,
})

export default reducer;