import { combineReducers } from 'redux';
import { adminPizzaReducer, newPizzaReducer, pizzaReducer } from './pizzaReducers';
import { authReducer, loadedUserReducer, userReducer } from './userReducers';

const reducer = combineReducers({
    auth: authReducer,
    loadedUser: loadedUserReducer,
    user: userReducer,

    newPizza: newPizzaReducer,
    adminPizza: adminPizzaReducer,
    pizza: pizzaReducer,
})

export default reducer;