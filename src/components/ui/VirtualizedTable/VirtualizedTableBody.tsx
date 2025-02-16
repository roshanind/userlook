import React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Table } from '@tanstack/react-table';

import { TableBody } from '@ui';

import VirtualizedTableRow from './VirtualizedTableRow';

type Props<T> = {
  table: Table<T>;
  tableContainerRef: React.RefObject<HTMLDivElement | null>;
};

/**
 * A component that renders the body of a virtualized table.
 * 
 * @template T - The type of data for each row in the table.
 * @param {Props<T>} props - The properties for the VirtualizedTableBody component.
 * @param {TableInstance<T>} props.table - The table instance containing the row model.
 * @param {React.RefObject<HTMLDivElement>} props.tableContainerRef - A reference to the table container element.
 * 
 * @returns {JSX.Element} The rendered virtualized table body.
 */
export default function VirtualizedTableBody<T>({ table, tableContainerRef }: Props<T>) {
  const { rows } = table.getRowModel();

  const virtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    count: rows.length,
    estimateSize: () => 33,
    getScrollElement: () => tableContainerRef.current,
    // measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  return (
    <TableBody
      style={{
        display: 'flex',
        height: `${virtualizer.getTotalSize()}px`,
        position: 'relative',
      }}
    >
      {virtualizer.getVirtualItems().map((virtualRow) => {
        const row = rows[virtualRow.index];
        return <VirtualizedTableRow key={row.id} row={row} virtualRow={virtualRow} rowVirtualizer={virtualizer} />;
      })}
    </TableBody>
  );
}
