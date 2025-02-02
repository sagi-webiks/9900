import Dialog from "@/components/layout/Dialog";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { Button, Stack, SvgIcon } from "@mui/material";

export default function ErrorDialog() {
  const handleClick = () => {
    window.location.href = "/";
  };

  return (
    <Dialog open={true}>
      <Dialog.Content>
        <Stack alignItems="center" spacing={6} paddingTop="48px">
          <SvgIcon component={ErrorOutlineOutlinedIcon} sx={{ height: "88px", width: "88px" }} />
          <Stack spacing={2}>
            <Dialog.Title>שגיאה בטעינת המערכת</Dialog.Title>
          </Stack>
        </Stack>
      </Dialog.Content>

      <Dialog.Actions sx={{ padding: "24px" }}>
        <Button fullWidth variant="contained" onClick={handleClick}>
          חזרה לעמוד הבית
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
}
