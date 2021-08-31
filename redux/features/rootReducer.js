import {combineReducers} from 'redux';
import loginReducer from './loginSlice';
import detailsReducer from './detailsSlice';
import addQustionReducer from './addQuestionSlice'

const rootReducer = combineReducers({
    login: loginReducer,
    details: detailsReducer,
    addQuestion: addQustionReducer,
});

export {rootReducer};
