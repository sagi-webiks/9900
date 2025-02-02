import { ListItemText, ListItemIcon, Typography } from "@mui/material";
import type { ReactNode } from "react";
import MenuItem from "@mui/material/MenuItem";

export interface ItemProps {
  text: string;
  icon: ReactNode;
  handleClick: () => void;
  disabled?: boolean;  
}

export default function Item({ text, icon, handleClick, disabled }: ItemProps) {
  return (
    <MenuItem onClick={handleClick} disabled={disabled}> 
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>
        <Typography color={disabled ? "text.disabled" : "primary"}>{text}</Typography> {/* Change text color if disabled */}
      </ListItemText>
    </MenuItem>
  );
}
