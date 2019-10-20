export const getFetchActionTypes = fetchType => {
  const requestType = `${fetchType}_REQUEST`;
  const successType = `${fetchType}_SUCCESS`;
  const errorType = `${fetchType}_ERROR`;

  return { requestType, successType, errorType };
};
