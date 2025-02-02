import LogoIcon from "@/assets/pngs/9900_unit_logo.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function AppBarLogo() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: 4}}>
      <img src={LogoIcon} alt="Logo" style={{ width: "70px", height: "70px" }} />

      <Typography color="primary" sx={{ fontSize: "24px", fontWeight: 600, mr: 1, userSelect: "none" }}>
        יחידה 9900
      </Typography>
    </Box>
  );
}

export default AppBarLogo;
