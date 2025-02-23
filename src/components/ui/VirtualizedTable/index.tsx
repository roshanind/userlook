import React, { useMemo } from 'react';
import { ColumnDef, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Virtualizer } from '@tanstack/react-virtual';

import { Paper, Table, TableContainer } from '@ui';

import VirtualizedTableBody from './VirtualizedTableBody';
import VirtualizedTableHeader from './VirtualizedTableHeader';
import ScrollToRecord from './ScrollToRecord';

type Props<T> = {
  data: Array<T>;
  columns: Array<ColumnDef<T>>;
  scrollToRowId?: number;
  idAccessorKey?: keyof T;
  isScrollAuto?: boolean;
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
export default function VirtualizedTable<T>({ data, columns, idAccessorKey, scrollToRowId, isScrollAuto }: Props<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const tableRowRef = React.useRef<Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null);

  const scrollToIndex = useMemo(() => {
    if (scrollToRowId !== undefined && idAccessorKey) {
      return table.getRowModel().rows.findIndex((row) => row.original[idAccessorKey] === scrollToRowId);
    }
  }, [scrollToRowId, idAccessorKey, table]);

  return (
    <TableContainer
      className="container"
      ref={tableContainerRef}
      sx={{ height: '100%', border: '1px solid', borderColor: 'divider', position: 'relative', overflow: 'auto' }}
      component={Paper}
    >
      <Table stickyHeader sx={{ tableLayout: 'fixed', borderCollapse: 'collapse' }}>
        <VirtualizedTableHeader table={table} />
        <VirtualizedTableBody ref={tableRowRef} table={table} tableContainerRef={tableContainerRef} />
      </Table>
      <ScrollToRecord recordIndex={scrollToIndex} rowVirtualizer={tableRowRef.current} isScrollAuto={isScrollAuto} />
    </TableContainer>
  );
}

export type { ColumnDef };
