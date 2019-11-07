import { useTheme, useMediaQuery } from "@material-ui/core";

const useDetectMobile = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return fullScreen;
};

export default useDetectMobile;
