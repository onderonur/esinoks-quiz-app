import React from "react";
import RouterLink from "./RouterLink";
import BaseMenu from "./BaseMenu";
import firebaseAPI from "firebaseAPI";
import useConfirmDialog from "hooks/useConfirmDialog";

const UserMenu = ({ renderTrigger }) => {
  const confirm = useConfirmDialog();

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
          onClick: () => {
            confirm({
              title: "Çıkış Yap?",
              description:
                "Hesabınızdan çıkış yapmak istediğinize emin misiniz?",
              confirmText: "Çıkış",
              onConfirm: () => firebaseAPI.signOut()
            });
          }
        }
      ]}
    />
  );
};

export default UserMenu;
