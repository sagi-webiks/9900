import { useDialog } from "@/hooks/useDialog";
import { useMapFeatures } from "@/pages/MapPage/useMapFeatures";
import { InteractionMode } from "@/types";
import { Button } from "@mui/material";
import type { MRT_ColumnDef } from "material-react-table";
import type { Feature } from "ol";
import type { Geometry } from "ol/geom";

export type TableColumn = MRT_ColumnDef<Feature<Geometry>, unknown>;

const nameColumn: TableColumn = {
  accessorFn: (row) => row.getProperties().name,
  header: "שם",
  sortingFn: (rowA, rowB) => {
    const rowAProperties = rowA.original.getProperties();
    const rowBProperties = rowB.original.getProperties();
    return rowAProperties.name.localeCompare(rowBProperties.name);
  },
  Cell: ({ row }) => { 
    return row.original.getProperties().name; },
};

const createdAtColumn: TableColumn = {
  accessorFn: (row) => row.getProperties().createdAt,
  header: "תאריך יצירה",
  Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleDateString("he-IL"),
  enableSorting: true,
  sortingFn: (rowA, rowB) => {
    const rowAProperties = rowA.original.getProperties();
    const rowBProperties = rowB.original.getProperties();

    return new Date(rowAProperties.createdAt).getTime() - new Date(rowBProperties.createdAt).getTime();
  },
};

const priorityColumn: TableColumn = {
  accessorFn: (row) => row.getProperties().priority,
  header: "עדיפות",
};

const positionColumn: TableColumn = {
  accessorFn: (row) => row.getProperties().geometry,
  header: "מיקום",
  Cell: ({ row }) => {
    const { openDialog } = useDialog();
    const { setFeatures } = useMapFeatures();

    const dialogName = row.original.getGeometry()?.getType() as string;

    return (
      <Button
        onClick={() => {
          setFeatures([row.original]);
          openDialog(dialogName, InteractionMode.View);
        }}
        variant="contained"
      >
        הצג
      </Button>
    );
  },
};

export const ToDosTableColumns = [nameColumn, priorityColumn, createdAtColumn, positionColumn];
