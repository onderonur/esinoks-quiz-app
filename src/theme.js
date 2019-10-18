import { createMuiTheme } from "@material-ui/core";
import starfieldJpg from "assets/starfield.jpg";

const theme = createMuiTheme({
  palette: {
    type: "light"
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          minHeight: "100vh",
          backgroundImage: `url(${starfieldJpg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }
      }
    }
  }
});

export default theme;
