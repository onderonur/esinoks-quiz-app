import React from "react";
import BaseMenu from "components/BaseMenu";

const EditableChoiceListItemMenu = ({
  renderTrigger,
  onEditClick,
  onDeleteClick
}) => {
  const handleEditClick = () => {
    onEditClick();
  };

  const handleDeleteClick = () => {
    onDeleteClick();
  };

  return (
    <BaseMenu
      renderTrigger={renderTrigger}
      menuItems={[
        { key: "edit", title: "Düzenle", onClick: handleEditClick },
        { key: "delete", title: "Sil", onClick: handleDeleteClick }
      ]}
    />
  );
};

export default EditableChoiceListItemMenu;
