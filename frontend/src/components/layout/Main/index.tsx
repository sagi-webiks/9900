import { styled } from "@mui/material/styles";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme }) => ({
  marginTop: "35px",
  padding: theme.spacing(10.5, 12, 0, 12),
}));

export default Main;
