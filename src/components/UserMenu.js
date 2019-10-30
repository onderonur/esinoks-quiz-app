import React from "react";
import useFirebase from "hooks/useFirebase";
import RouterLink from "./RouterLink";
import BaseMenu from "./BaseMenu";

const UserMenu = ({ renderTrigger }) => {
  const firebase = useFirebase();

  return (
    <BaseMenu
      renderTrigger={renderTrigger}
      menuItems={[
        {
          key: "profile",
          title: "Profil",
          to: "/profile",
          component: RouterLink
        },
        {
          key: "signOut",
          title: "Çıkış",
          onClick: () => firebase.doSignOut()
        }
      ]}
    />
  );
};

export default UserMenu;
