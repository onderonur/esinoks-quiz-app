import { useSelector } from "react-redux";
import { selectors } from "reducers";

const useSelectAuthUser = () => {
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingAuthState(state)
  );
  const authUser = useSelector(state => selectors.selectAuthUser(state));
  return { authUser, isFetching };
};

export default useSelectAuthUser;
