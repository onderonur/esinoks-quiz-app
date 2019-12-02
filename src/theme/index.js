import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import starfieldJpg from "assets/starfield.jpg";
import { red, green, grey } from "@material-ui/core/colors";

export const Colors = {
  primary: "#165982",
  secondary: "#2dde98",
  red: red[400],
  green: green[600],
  grey: grey[400]
};

let theme = createMuiTheme({
  palette: {
    primary: {
      main: Colors.primary
    },
    secondary: {
      main: Colors.secondary
    }
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          minHeight: "100vh",
          overflowX: "hidden",
          backgroundImage: `url(${starfieldJpg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed"
        }
      }
    }
  }
});

theme = responsiveFontSizes(theme);

export default theme;
