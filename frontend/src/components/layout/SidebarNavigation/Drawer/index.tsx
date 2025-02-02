import MuiDrawer, { type DrawerProps as MuiDrawerProps } from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import type { CSSObject, Theme } from "@mui/material/styles";
import type React from "react";

const TOP_APP_BAR_HEIGHT = 0;
interface CustomDrawerProps extends Omit<MuiDrawerProps, "variant" | "open"> {
  open: boolean;
  openWidth: number;
  closedWidth: number;
  anchor?: "left" | "right";
  additionalStyles?: CSSObject;
  openMixinAdditionalStyles?: CSSObject;
  closedMixinAdditionalStyles?: CSSObject;
}

const openMixin = (theme: Theme, openWidth: number | string, openMixinAdditionalStyles?: CSSObject): CSSObject => ({
  width: openWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  height: `calc(100% - ${TOP_APP_BAR_HEIGHT}px)`,
  top: TOP_APP_BAR_HEIGHT,
  padding: "5px",
  overflow: "hidden",
  ...openMixinAdditionalStyles,
});

const closedMixin = (
  theme: Theme,
  closedWidth: number | string,
  closedMixinAdditionalStyles?: CSSObject
): CSSObject => ({
  width: closedWidth,
  overflowX: "hidden",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.leavingScreen,
  }),
  height: `calc(100% - ${TOP_APP_BAR_HEIGHT}px)`,
  top: TOP_APP_BAR_HEIGHT,
  padding: "5px",
  ...closedMixinAdditionalStyles,
});

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) =>
    prop !== "open" &&
    prop !== "openWidth" &&
    prop !== "closedWidth" &&
    prop !== "openMixinAdditionalStyles" &&
    prop !== "closedMixinAdditionalStyles" &&
    prop !== "additionalStyles",
})<CustomDrawerProps>(
  ({
    theme,
    open,
    openWidth,
    closedWidth,
    additionalStyles,
    openMixinAdditionalStyles,
    closedMixinAdditionalStyles,
  }) => ({
    flexShrink: 0,
    zIndex: theme.zIndex.drawer,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...additionalStyles,
    ...(open && {
      "& .MuiDrawer-paper": openMixin(theme, openWidth, openMixinAdditionalStyles),
    }),
    ...(!open && {
      "& .MuiDrawer-paper": closedMixin(theme, closedWidth, closedMixinAdditionalStyles),
    }),
  })
);

const Drawer: React.FC<CustomDrawerProps> = ({
  open,
  openWidth,
  closedWidth,
  anchor = "left",
  additionalStyles,
  openMixinAdditionalStyles,
  closedMixinAdditionalStyles,
  children,
  ...rest
}) => {
  return (
    <StyledDrawer
      variant="permanent"
      open={open}
      anchor={anchor}
      openWidth={openWidth}
      closedWidth={closedWidth}
      additionalStyles={additionalStyles}
      openMixinAdditionalStyles={openMixinAdditionalStyles}
      closedMixinAdditionalStyles={closedMixinAdditionalStyles}
      {...rest}
    >
      {children}
    </StyledDrawer>
  );
};

export default Drawer;