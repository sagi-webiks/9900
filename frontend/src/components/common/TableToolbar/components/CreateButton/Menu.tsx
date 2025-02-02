import { Menu as MuiMenu, MenuList, type MenuProps, SvgIcon } from "@mui/material";
import Item, { type ItemProps } from "./Item";
import PointIcon from "@/assets/svgs/point.svg?react";
import PolygonIcon from "@/assets/svgs/polygon.svg?react";
import LineIcon from "@/assets/svgs/line.svg?react";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { GeometryType, GeometryTypeHebrewMapper } from "@/types";

interface Props extends MenuProps {
  handleMenuItemClick: (dialogType: GeometryType) => void;
}

function Menu({ open, anchorEl, onClose, handleMenuItemClick }: Props) {
  const menuItems: ItemProps[] = [
    {
      text: GeometryTypeHebrewMapper[GeometryType.Point],
      icon: (
        <SvgIcon
          component={PointIcon}
          sx={{
            height: 20,
            width: 20,
            path: {
              fill: "#909090",
            },
            fill: "#909090",
          }}
        />
      ),
      handleClick: () => handleMenuItemClick(GeometryType.Point),
      disabled: false, // First item is enabled
    },
    {
      text: GeometryTypeHebrewMapper[GeometryType.LineString],
      icon: (
        <SvgIcon
          inheritViewBox
          component={LineIcon}
          sx={{
            path: {
              fill: "#909090",
            },
            fill: "#909090",
          }}
        />
      ),
      handleClick: () => handleMenuItemClick(GeometryType.LineString),
      disabled: true,
    },
    {
      text: GeometryTypeHebrewMapper[GeometryType.Polygon],
      icon: (
        <SvgIcon
          inheritViewBox
          component={PolygonIcon}
          sx={{
            path: {
              fill: "#909090",
            },
            fill: "#909090",
          }}
        />
      ),
      handleClick: () => handleMenuItemClick(GeometryType.Polygon),
      disabled: true,
    },
    {
      text: GeometryTypeHebrewMapper[GeometryType.Circle],
      icon: (
        <SvgIcon
          inheritViewBox
          component={CircleOutlinedIcon}
          sx={{
            path: {
              fill: "#909090",
            },
            fill: "#909090",
          }}
        />
      ),
      handleClick: () => handleMenuItemClick(GeometryType.Circle),
      disabled: true,
    },
    
  ];

  return (
    <MuiMenu
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      sx={{ mt: 1 }}
      MenuListProps={{
        sx: (theme) => ({
          backgroundColor: theme.palette.background.paper,
          padding: 0,
        }),
      }}
    >
      <MenuList sx={{ padding: 0 }}>
        {menuItems.map(({ text, icon, handleClick, disabled }) => (
          <Item
            key={text}
            text={text}
            icon={icon}
            handleClick={handleClick}
            disabled={disabled} 
          />
        ))}
      </MenuList>
    </MuiMenu>
  );
}

export default Menu;
