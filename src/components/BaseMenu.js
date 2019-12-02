import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const BaseMenu = ({ renderTrigger, menuItems }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {renderTrigger({ onClick: handleClick })}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        {menuItems.map(menuItem => {
          const { key, title, onClick, ...restProps } = menuItem;
          return (
            <MenuItem
              key={key}
              {...restProps}
              onClick={() => {
                if (onClick) {
                  onClick();
                }
                handleClose();
              }}
            >
              {title}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default BaseMenu;
