import { ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIcon, useTheme } from "@mui/material";
import type React from "react";
import { memo, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  text: string;
  isSidebarOpen: boolean;
  href: string;
  IconComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
}

function SidebarItem({ text, isSidebarOpen, href, IconComponent }: Props) {
  const theme = useTheme();
  const location = useLocation();

  const isSelected = useMemo(() => location.pathname === href?.split("?")[0], [location.pathname, href]);

  const iconAndTextColor = useMemo(
    () => (isSelected ? theme.palette.primary.main : "#909090"),
    [isSelected, theme.palette.primary.main]
  );

  return (
    <ListItem disablePadding sx={{ display: "block", margin: "8px 0" }}>
      <Link to={href} style={{ textDecoration: "none" }}>
        <ListItemButton
          disabled={!href}
          disableRipple
          sx={{
            height: 45,
            px: 2.1,
            borderRadius: "4px",
          }}
          selected={isSelected}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              paddingInlineEnd: isSidebarOpen ? "15px" : 0,
            }}
          >
            <SvgIcon fontSize="medium" sx={{ stroke: iconAndTextColor, color: iconAndTextColor, marginLeft: "-7px" }}>
              <IconComponent />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText
            primary={text}
            sx={{
              opacity: isSidebarOpen ? 1 : 0,
              transition: "opacity 200ms ease-in",
              visibility: isSidebarOpen ? "visible" : "hidden",
            }}
            primaryTypographyProps={{
              fontWeight: 500,
              fontSize: "0.975rem",
              textAlign: "start",
              color: iconAndTextColor,
            }}
          />
        </ListItemButton>
      </Link>
    </ListItem>
  );
}

export default memo(SidebarItem);
