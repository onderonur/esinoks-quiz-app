import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Avatar } from "@material-ui/core";
import useFirebase from "hooks/useFirebase";
import RouterLink from "./RouterLink";
import useSelectAuthUser from "hooks/useSelectAuthUser";

// TODO: Fix this name
const UserButtonMenu = () => {
  const authUser = useSelectAuthUser();
  const firebase = useFirebase();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return authUser ? (
    <>
      {/* TODO: Bu avatar button'un style'ını vs düzelt */}
      <Avatar src={authUser.photoURL} onClick={handleClick} />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <MenuItem to="/profile" component={RouterLink} onClick={handleClose}>
          Profil
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            firebase.doSignOut();
          }}
        >
          Çıkış
        </MenuItem>
      </Menu>
    </>
  ) : null;
};

export default UserButtonMenu;
