import {combineReducers} from 'redux';
import loginReducer from './loginSlice';
import detailsReducer from './detailsSlice';

const rootReducer = combineReducers({
    login: loginReducer,
    details: detailsReducer,
});

export {rootReducer};
