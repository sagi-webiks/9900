import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";

const StyledAppBar = styled(MuiAppBar)(({ theme }) => ({
  position: "fixed",
  height: 90,
  boxShadow: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
  padding: theme.spacing(0, 7),
  background: theme.palette.background.default,
}));

export default StyledAppBar;
