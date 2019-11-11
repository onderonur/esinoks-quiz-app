import { useSelector } from "react-redux";
import { selectors } from "reducers";

const useSelectAuthUser = () => {
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingAuthState(state)
  );
  const isLoggedIn = useSelector(state => selectors.selectIsLoggedIn(state));
  const authUser = useSelector(state => selectors.selectAuthUser(state));

  return { isFetching, isLoggedIn, authUser };
};

export default useSelectAuthUser;
