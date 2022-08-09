import { createStore, applyMiddleware, compose } from 'redux';
import redux_thunk from 'redux-thunk';
import rootReducer from './reducer/authReducer';

const middleware = [redux_thunk];

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
