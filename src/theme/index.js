import { createMuiTheme } from "@material-ui/core";
import starfieldJpg from "assets/starfield.jpg";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#165982"
    },
    secondary: {
      main: "#2dde98"
    }
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
