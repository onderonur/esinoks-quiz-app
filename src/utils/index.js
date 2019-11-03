import app from "firebase/app";

export const getFetchActionTypes = fetchType => {
  const requestType = `${fetchType}_REQUEST`;
  const successType = `${fetchType}_SUCCESS`;
  const errorType = `${fetchType}_ERROR`;

  return { requestType, successType, errorType };
};

export const getFirestoreTimeStamp = date =>
  app.firestore.Timestamp.fromDate(date);
