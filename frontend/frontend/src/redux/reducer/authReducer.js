import { reducerIndex } from './reducerIndex';
import { combineReducers } from 'redux';
import { signup } from './userReducer';
import { productReducer } from './productReducer';
import { orderReducder } from './orderReducer';
import { categoryReducer } from './categoryReducer';

const rootReducer = combineReducers({
  auth: reducerIndex,
  user: signup,
  product: productReducer,
  order: orderReducder,
  category: categoryReducer,
});

export default rootReducer;
