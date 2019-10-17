import React from "react";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import { IconButton, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { toggleFullscreen } from "actions";
import { selectors } from "reducers";

const useStyles = makeStyles(theme => ({
  button: {
    color: theme.palette.grey[100]
  }
}));

const FullscreenButton = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isFullscreen = useSelector(state =>
    selectors.selectIsFullscreen(state)
  );

  return (
    <IconButton
      className={classes.button}
      onClick={() => dispatch(toggleFullscreen(!isFullscreen))}
    >
      {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
    </IconButton>
  );
};

export default FullscreenButton;
