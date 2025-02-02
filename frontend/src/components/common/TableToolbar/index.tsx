import { Box } from "@mui/material";
import CreateButton from "./components/CreateButton";
import FeatureDialog from "../FeatureDialog";

export default function TableToolbar() {
 
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" gap={2} marginBottom={4}>
        <Box />
        <CreateButton />
      </Box>
      <FeatureDialog />
    </>
  );
}
