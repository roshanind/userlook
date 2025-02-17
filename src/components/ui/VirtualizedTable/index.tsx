import React from 'react';
import { ColumnDef, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';

import { Paper, Table, TableContainer } from '@ui';

import VirtualizedTableBody from './VirtualizedTableBody';
import VirtualizedTableHeader from './VirtualizedTableHeader';

type Props<T> = {
  data: Array<T>;
  columns: Array<ColumnDef<T>>;
};

/**
 * A virtualized table component that efficiently renders large datasets.
 * 
 * @template T - The type of data being displayed in the table.
 * 
 * @param {Props<T>} props - The properties for the VirtualizedTable component.
 * @param {T[]} props.data - The data to be displayed in the table.
 * @param {Column<T>[]} props.columns - The column definitions for the table.
 * 
 * @returns {JSX.Element} The rendered virtualized table component.
 */
export default function VirtualizedTable<T>({ data, columns }: Props<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  return (
    <TableContainer
      className="container"
      ref={tableContainerRef}
      sx={{ height: '100%' }}
      component={Paper}
    >
      <Table stickyHeader sx={{ tableLayout: 'fixed', borderCollapse: 'collapse' }}>
        <VirtualizedTableHeader table={table} />
        <VirtualizedTableBody table={table} tableContainerRef={tableContainerRef} />
      </Table>
    </TableContainer>
  );
}

export type { ColumnDef };
