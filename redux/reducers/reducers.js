import { combineReducers } from 'redux';
import { authReducer, loadedUserReducer, userReducer } from './userReducers';

const reducer = combineReducers({
    auth: authReducer,
    loadedUser: loadedUserReducer,
    user: userReducer,
})

export default reducer;