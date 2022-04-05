import { combineReducers } from 'redux';
import contactReducer from './contactReducer';
import messages from './messages';

export default combineReducers({
    contact: contactReducer,
    messages: messages
});