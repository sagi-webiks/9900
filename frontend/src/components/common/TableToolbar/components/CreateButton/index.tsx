import AddIcon from "@mui/icons-material/Add";
import Menu from "./Menu";
import type React from "react";
import { useState } from "react";
import { IconButton } from "@mui/material";
import { useDialog } from "@/hooks/useDialog";
import { InteractionMode } from "@/types";

function CreateButton() {
  const [showMenu, setShowMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { openDialog } = useDialog();

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setShowMenu(true);
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  const handleMenuItemClick = (dialogType: string) => {
    openDialog(dialogType, InteractionMode.Create);
    handleCloseMenu();
  };

  return (
    <>
      <IconButton onClick={handleOpenMenu} style={{ border: "2px solid #3ECF8E", borderRadius: "50%" }}>
        <AddIcon fontSize="medium" />
      </IconButton>
      <Menu open={showMenu} anchorEl={anchorEl} onClose={handleCloseMenu} handleMenuItemClick={handleMenuItemClick} />
    </>
  );
}

export default CreateButton;
