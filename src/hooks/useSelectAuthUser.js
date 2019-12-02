import { useSelector } from "react-redux";
import { selectors } from "reducers";

const useSelectAuthUser = () => {
  const { isFetching } = useSelector(state =>
    selectors.selectAsyncInfoAuthState(state)
  );
  const isSignedIn = useSelector(state => selectors.selectisSignedIn(state));
  const authUser = useSelector(state => selectors.selectAuthUser(state));

  return { isFetching, isSignedIn, authUser };
};

export default useSelectAuthUser;
