import { PaginationItem } from "@mui/material";
import {
  type MRT_ColumnDef,
  type MRT_PaginationState,
  type MRT_Row,
  type MRT_RowData,
  type MRT_SortingState,
  type MRT_TableOptions,
  MRT_TablePagination,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_HE } from "material-react-table/locales/he";
import type React from "react";
import { useState } from "react";

interface Props<T extends MRT_RowData> extends MRT_TableOptions<T> {
  data: T[];
  columns: MRT_ColumnDef<T>[];
  isLoading: boolean;
  sortBy?: MRT_SortingState;
  setSortBy?: React.Dispatch<React.SetStateAction<MRT_SortingState>>;
  rowCount?: number;
  pagination?: MRT_PaginationState;
  setPagination?: React.Dispatch<React.SetStateAction<MRT_PaginationState>>;
  rowClickAction?: (row: MRT_Row<T>) => void;
  rowDoubleClickAction?: (row: MRT_Row<T>) => void;
}

export default function Table<T extends MRT_RowData>({
  data,
  columns,
  isLoading,
  rowCount = 0,
  sortBy,
  setSortBy,
  pagination,
  setPagination,
  rowClickAction,
  rowDoubleClickAction,
  ...rest
}: Props<T>) {
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleTableRowClick = (row: MRT_Row<T>) => {
    if (!rowClickAction) return;
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      return;
    }

    const timeout = setTimeout(() => {
      setClickTimeout(null);
      rowClickAction(row);
    }, 150);
    setClickTimeout(timeout);
  };

  const handleTableRowDoubleClick = (row: MRT_Row<T>) => {
    if (!rowDoubleClickAction) return;
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
    }
    rowDoubleClickAction(row);
  };

  const table = useMaterialReactTable({
    getRowId: (row) => row.id,
    columns,
    data,
    onPaginationChange: setPagination,
    onSortingChange: setSortBy,
    rowCount,
    state: {
      pagination: pagination || { pageIndex: 0, pageSize: 10 },
      isLoading,
      sorting: sortBy || [],
    },
    manualPagination: true,
    enableBottomToolbar: false,
    enableTopToolbar: false,
    enableColumnActions: false,
    enableSorting: !!sortBy,
    enableSortingRemoval: false,
    localization: MRT_Localization_HE,
    paginationDisplayMode: "pages",
    muiTableContainerProps: rest.muiTableContainerProps,
    enableStickyHeader: true,
    muiPaginationProps: {
      color: "primary",
      shape: "rounded",
      renderItem: (props) => <PaginationItem {...props} />,
    },
    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.background.paper,
    }),
    muiSkeletonProps: {
      animation: "wave",
    },
    muiCircularProgressProps: {
      size: 0,
    },
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => handleTableRowClick(row),
      onDoubleClick: () => handleTableRowDoubleClick(row),
    }),
    defaultColumn: {
      muiTableHeadCellProps: () => ({
        sx: {
          color: "#3ECF8E",
        },
        align: "center",
      }),
      muiTableBodyCellProps: {
        align: "center",
        sx: {
          maxWidth: "none !important",        
          whiteSpace: "nowrap !important",
          overflow: "hidden !important",
          direction: "rtl",
        },
      },

      size: 10,
    },
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: '', 

      },

    },
    ...rest,
  });

  return (
    <>
      <MaterialReactTable table={table} />
      {rest.enablePagination && <MRT_TablePagination table={table} />}
    </>
  );
}
