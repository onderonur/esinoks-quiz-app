import { useSelector } from "react-redux";
import { selectors } from "reducers";

const useSelectAuthUser = () => {
  const authUser = useSelector(state => selectors.selectAuthUser(state));
  return authUser;
};

export default useSelectAuthUser;
