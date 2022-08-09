import { reducerIndex } from './reducerIndex';
import { combineReducers } from 'redux';
import { signup } from './userReducer';

const rootReducer = combineReducers({
  auth: reducerIndex,
  user: signup,
});

export default rootReducer;
