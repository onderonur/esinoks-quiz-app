import { useState } from "react";

const useDialogToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return [isOpen, { openDialog, closeDialog }];
};

export default useDialogToggle;
