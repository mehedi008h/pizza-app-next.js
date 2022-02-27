import { combineReducers } from 'redux';
import { newPizzaReducer } from './pizzaReducers';
import { authReducer, loadedUserReducer, userReducer } from './userReducers';

const reducer = combineReducers({
    auth: authReducer,
    loadedUser: loadedUserReducer,
    user: userReducer,

    newPizza: newPizzaReducer,
})

export default reducer;