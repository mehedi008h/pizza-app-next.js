import { combineReducers } from 'redux';
import { authReducer } from './userReducers';

const reducer = combineReducers({
    auth: authReducer,
})

export default reducer;