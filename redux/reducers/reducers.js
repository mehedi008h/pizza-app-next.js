import { combineReducers } from 'redux';
import { authReducer, loadedUserReducer } from './userReducers';

const reducer = combineReducers({
    auth: authReducer,
    loadedUser: loadedUserReducer,
})

export default reducer;