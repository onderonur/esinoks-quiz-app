const createReset = (resetTypes, initialState, reducer) => {
  const reducerWithReset = (state = initialState, action) => {
    if (resetTypes.includes(action.type)) {
      return initialState;
    }

    return reducer(state, action);
  };

  return reducerWithReset;
};

export default createReset;
