import { Box, List, Typography, useTheme } from "@mui/material";
import type { CSSObject } from "@mui/material/styles";
import { useCallback, useState } from "react";

import Drawer from "@/components/layout/SidebarNavigation/Drawer";
import SidebarItem from "@/components/layout/SidebarNavigation/SidebarItem";

import MapIcon from '@mui/icons-material/Map';
import TableChartIcon from '@mui/icons-material/TableChart';

const DRAWER_WIDTH_OPEN = 350;
const DRAWER_WIDTH_CLOSED = 55;

const sidebarItems = [
  {
    text: "תצוגה טבלאית",
    icon: TableChartIcon,
    href: "/",
  },
  {
    text: "תצוגת מפה",
    icon: MapIcon,
    href: "/map",
  },
];

function SidebarNavigation() {
  const theme = useTheme();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleDrawerOpen = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const openMixinAdditionalStyles: CSSObject = {
    borderRadius: "0px 10px 10px 0px",
    background: "rgba(23, 23, 23, 0.8)",
    backdropFilter: "blur(10px)",
    borderLeft: `1px solid ${theme.palette.divider}`,
  };
  const closedMixinAdditionalStyles: CSSObject = {
    borderRadius: "0px 10px 10px 0px",
    background: "rgba(23, 23, 23, 0.8)",
    backdropFilter: "blur(10px)",
    borderLeft: `1px solid ${theme.palette.divider}`,
  };
  
  return (
    <Box onMouseEnter={handleDrawerOpen} onMouseLeave={handleDrawerClose}>
      <Drawer
        open={isSidebarOpen}
        openWidth={DRAWER_WIDTH_OPEN}
        closedWidth={DRAWER_WIDTH_CLOSED}
        openMixinAdditionalStyles={openMixinAdditionalStyles}
        closedMixinAdditionalStyles={closedMixinAdditionalStyles}
      >
        <Box sx={{ height: 100 }} />
        <List disablePadding>
          {sidebarItems.map(({ text, icon, href }) => (
            <SidebarItem key={text} text={text} isSidebarOpen={isSidebarOpen} href={href} IconComponent={icon} />
          ))}
        </List>
        <Box sx={{ marginTop: "auto", display: "flex", justifyContent: "center" }}>
          <Typography variant="caption" sx={{ color:"#3ECF8E", textAlign: "center", userSelect: "none", fontWeight: 700 }}>
            v1.0.0
          </Typography>
        </Box>
      </Drawer>
    </Box>
  );
}

export default SidebarNavigation;
