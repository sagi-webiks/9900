import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export default function CloseButton({ handleClose }: { handleClose: () => void }) {
  return (
    <IconButton onClick={handleClose} disableRipple sx={{ minWidth: 0, padding: 0 }}>
      <CloseIcon />
    </IconButton>
  );
}
