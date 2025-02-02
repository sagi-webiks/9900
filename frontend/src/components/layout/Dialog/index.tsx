import { CloseOutlined } from "@mui/icons-material";
import { DialogActions, DialogContent, IconButton, Typography } from "@mui/material";
import MuiDialog from "@mui/material/Dialog";
import type DialogTitle from "@mui/material/DialogTitle";
import type { ComponentProps, MouseEvent } from "react";

function Dialog({
  width = "600px",
  height = "500px",
  handleClose,
  closeButtonProps,
  ...props
}: ComponentProps<typeof MuiDialog> & {
  width?: string | number;
  height?: string | number;
  handleClose?: (event: MouseEvent<HTMLButtonElement>) => void;
  closeButtonProps?: ComponentProps<typeof IconButton>;
}) {
  
  const defaultPaperProps = {
    sx: {
      width,
      height,
      paddingX: 3,
      paddingY: 4,
      backgroundImage: "none",
      ...props.PaperProps?.sx,
    },
  };
  const closeButtonStyle = {
    padding: 0,
    width: "fit-content",
    marginLeft: "auto",
    zIndex: 9999,
    ...closeButtonProps?.sx,
  };
  return (
    <MuiDialog
      open={props.open}
      fullWidth={props.fullWidth || true}
      PaperProps={{
        ...props.PaperProps,
        sx: defaultPaperProps.sx,
      }}
      hideBackdrop={props.hideBackdrop || false}
    >
      {handleClose && (
        <IconButton
          disableRipple
          onClick={handleClose}
          {...closeButtonProps}
          sx={closeButtonStyle}
        >
          <CloseOutlined />
        </IconButton>
      )}
      {props.children}
    </MuiDialog>
  );
}

Dialog.Title = (props: ComponentProps<typeof DialogTitle>) => {
  const defaultProps: ComponentProps<typeof Typography> = {
    fontSize: 24,
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "24px",
  };
  return (
    <Typography {...defaultProps} {...props}>
      {props.children}
    </Typography>
  );
};

Dialog.Subtitle = (props: ComponentProps<typeof DialogTitle>) => {
  const defaultProps: ComponentProps<typeof Typography> = {
    textAlign: "center",
    fontSize: 22,
    fontStyle: "normal",
    fontWeight: 500,
    color: "#AFB4C1",
    lineHeight: "24px",
  };
  return (
    <Typography {...defaultProps} {...props}>
      {props.children}
    </Typography>
  );
};

Dialog.Content = (props: ComponentProps<typeof DialogContent>) => {
  return (
    <DialogContent sx={{ paddingX: 3 }} {...props}>
      {props.children}
    </DialogContent>
  );
};

Dialog.Actions = (props: ComponentProps<typeof DialogActions>) => {
  const defaultProps: ComponentProps<typeof DialogActions> = {
    sx: {
      display: "flex",
      justifyContent: "center",
      minHeight: "max-content",
      paddingX: 3,
      ...props.sx,
    },
  };

  return (
    <DialogActions {...props} sx={defaultProps.sx}>
      {props.children}
    </DialogActions>
  );
};
export default Dialog;
