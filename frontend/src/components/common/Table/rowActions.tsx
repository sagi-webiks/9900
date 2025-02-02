import type { Feature } from "ol";
import type { Geometry } from "ol/geom";

import { Box, Button } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import type { MRT_TableOptions } from "material-react-table";
import { useDialog } from "@/hooks/useDialog";
import { InteractionMode } from "@/types";
import { useDeleteTodo } from "@/hooks/useTodos";
import { toast } from "react-toastify";

export const ToDosRowActions: MRT_TableOptions<Feature<Geometry>>["renderRowActions"] = (props) => {
  const { row } = props;
  const { openDialog } = useDialog();

  const { mutate: deleteTodo } = useDeleteTodo(
    () => toast.success("נמחק בהצלחה"),
    () => toast.error("אירעה שגיאה במחיקה")
  );

  return (
    <Box display="flex" gap={1} justifyContent="center" alignItems="center">
      <Button
        variant="contained"
        color="error"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 40,
          width: "auto",
          height: 40,
          padding: 0,
        }}
        onClick={() => deleteTodo(row.original.getId() as string)}
      >
        <DeleteIcon />
      </Button>

      <Button
        variant="contained"
        color="primary"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 40,
          width: "auto",
          height: 40,
          padding: 0,
        }}
        onClick={() => openDialog(row.original.getGeometry()?.getType() as string, InteractionMode.Edit, row.original)}
      >
        <EditIcon />
      </Button>
    </Box>
  );
};
