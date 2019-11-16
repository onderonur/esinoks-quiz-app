import React from "react";
import useFirebaseAPI from "hooks/useFirebaseAPI";
import RouterLink from "./RouterLink";
import BaseMenu from "./BaseMenu";

const UserMenu = ({ renderTrigger }) => {
  const firebaseAPI = useFirebaseAPI();

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
          onClick: () => firebaseAPI.doSignOut()
        }
      ]}
    />
  );
};

export default UserMenu;
