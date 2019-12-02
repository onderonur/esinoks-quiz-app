// https://codesandbox.io/s/github/iamhosseindhv/notistack/tree/master/examples/redux-example
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import { removeSnackbar } from "actions";
import { selectors } from "reducers";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

class Notifier extends React.Component {
  displayed = [];

  storeDisplayed = id => {
    this.displayed = [...this.displayed, id];
  };

  removeDisplayed = id => {
    this.displayed = this.displayed.filter(key => id !== key);
  };

  componentDidUpdate() {
    const {
      notifications = [],
      enqueueSnackbar,
      removeSnackbar,
      closeSnackbar
    } = this.props;

    notifications.forEach(
      ({ key, message, options = {}, dismissed = false }) => {
        if (dismissed) {
          closeSnackbar(key);
          return;
        }
        // Do nothing if snackbar is already displayed
        if (this.displayed.includes(key)) return;
        // Display snackbar using notistack
        enqueueSnackbar(message, {
          key,
          ...options,
          action: options.action
            ? options.action
            : key => (
                <IconButton
                  color="inherit"
                  size="small"
                  onClick={() => closeSnackbar(key)}
                >
                  <CloseIcon />
                </IconButton>
              ),
          onClose: (event, reason, key) => {
            if (options.onClose) {
              options.onClose(event, reason, key);
            }
          },
          onExited: (event, key) => {
            removeSnackbar(key);
            this.removeDisplayed(key);
          }
        });
        // Keep track of snackbars that we've displayed
        this.storeDisplayed(key);
      }
    );
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  notifications: selectors.selectNotifications(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ removeSnackbar }, dispatch);

export default withSnackbar(
  connect(mapStateToProps, mapDispatchToProps)(Notifier)
);
