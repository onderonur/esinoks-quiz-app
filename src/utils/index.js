// TODO: May switch this name with "app-firebase/firebase"
import admin from "firebase";

export const getFetchActionTypes = fetchType => {
  const requestType = `${fetchType}_REQUEST`;
  const successType = `${fetchType}_SUCCESS`;
  const errorType = `${fetchType}_ERROR`;

  return { requestType, successType, errorType };
};

export const getFirestoreTimeStamp = date =>
  admin.firestore.Timestamp.fromDate(date);
