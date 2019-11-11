import app from "firebase/app";

export const getFetchActionTypes = fetchType => {
  const requestType = `${fetchType}_REQUEST`;
  const successType = `${fetchType}_SUCCESS`;
  const errorType = `${fetchType}_ERROR`;
  const cancelType = `${fetchType}_CANCELLED`;

  return { requestType, successType, errorType, cancelType };
};

export const getFirestoreTimeStamp = date =>
  app.firestore.Timestamp.fromDate(date);
