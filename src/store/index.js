import { createStore, applyMiddleware } from "redux";
import rootReducer from "reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";
import rootEpic from "epics";

const epicMiddleware = createEpicMiddleware();

// https://redux.js.org/recipes/configuring-your-store
function configureStore(preloadedState) {
  const middlewares = [epicMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  epicMiddleware.run(rootEpic);

  return store;
}

export default configureStore;
