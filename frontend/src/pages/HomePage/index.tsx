import { ToDosTableColumns } from "@/components/common/Table/tableColumns";
import Table from "@/components/common/Table";
import TableToolBar from "@/components/common/TableToolbar";
import { ToDosRowActions } from "@/components/common/Table/rowActions";
import { useGetTodos } from "@/hooks/useTodos";
import type { Geometry } from "ol/geom";
import type { Feature } from "ol";

export default function HomePage() {
  const { data, isLoading } = useGetTodos();

  return (
    <>
      <TableToolBar />
      <Table
        columns={ToDosTableColumns}
        data={(data as Feature<Geometry>[]) || []}
        isLoading={isLoading}
        enableRowActions={true}
        renderRowActions={ToDosRowActions}
      />
    </>
  );
}
