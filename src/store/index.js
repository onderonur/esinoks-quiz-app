import { createStore, applyMiddleware } from "redux";
import rootReducer from "reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";
import rootEpic from "epics";
import createSagaMiddleware from "redux-saga";

const epicMiddleware = createEpicMiddleware();
const sagaMiddleware = createSagaMiddleware();

// https://redux.js.org/recipes/configuring-your-store
const configureStore = preloadedState => {
  const middlewares = [sagaMiddleware, epicMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  store.runSaga = sagaMiddleware.run;

  epicMiddleware.run(rootEpic);

  return store;
};

export default configureStore;
