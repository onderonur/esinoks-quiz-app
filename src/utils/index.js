import app from "firebase/app";

export const getFetchTypes = fetchType => {
  const requested = `${fetchType}_REQUESTED`;
  const succeeded = `${fetchType}_SUCCEEDED`;
  const failed = `${fetchType}_FAILED`;
  const cancelled = `${fetchType}_CANCELLED`;

  return { requested, succeeded, failed, cancelled };
};

export const getFirestoreTimeStamp = date =>
  app.firestore.Timestamp.fromDate(date);

export const removeItemFromArrayMutation = (array, item) => {
  array.splice(array.indexOf(item));
};
