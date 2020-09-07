import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// reducers
import reducer from '../reducers';

const {imageData} = reducer;

const rootReducer = combineReducers({
  ...reducer,
  imageData,
});

let middleware = [thunk];

let composeEnhancers = compose;

if (__DEV__) {
  // eslint-disable-next-line no-underscore-dangle
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  middleware = [...middleware, logger];
} else {
  middleware = [...middleware];
}

export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware)),
  );
  return {store};
}
