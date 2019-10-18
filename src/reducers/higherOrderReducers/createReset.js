const createReset = (resetType, initialState, reducer) => {
  const reducerWithReset = (state = initialState, action) => {
    switch (action.type) {
      case resetType:
        return initialState;
      default:
        return reducer(state, action);
    }
  };

  return reducerWithReset;
};

export default createReset;
