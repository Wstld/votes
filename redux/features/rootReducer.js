import {combineReducers} from 'redux';
import loginReducer from './loginSlice';
import detailsReducer from './detailsSlice';
import addQustionReducer from './addQuestionSlice'
import friendsReducer from './friendsSlice'

const rootReducer = combineReducers({
    login: loginReducer,
    details: detailsReducer,
    addQuestion: addQustionReducer,
    friends:friendsReducer,
});

export {rootReducer};
