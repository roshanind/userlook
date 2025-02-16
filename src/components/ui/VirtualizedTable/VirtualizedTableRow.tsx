import { flexRender, Row } from '@tanstack/react-table';
import { VirtualItem, Virtualizer } from '@tanstack/react-virtual';

import { TableCell, TableRow } from '@ui';

type Props<T> = {
  row: Row<T>
  virtualRow: VirtualItem
  rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>
};

/**
 * A functional component that renders a virtualized table row.
 * 
 * @template T - The type of the row data.
 * 
 * @param {Object} props - The properties object.
 * @param {T} props.row - The data for the row.
 * @param {Object} props.virtualRow - The virtual row object containing index and start position.
 * @param {Object} props.rowVirtualizer - The row virtualizer object used to measure the element.
 * 
 * @returns {JSX.Element} The rendered virtualized table row.
 */
export default function VirtualizedTableRow<T>({ row, virtualRow, rowVirtualizer }: Props<T>) {
  return (
    <TableRow
      data-index={virtualRow.index}
      ref={node => rowVirtualizer.measureElement(node)}
      key={row.id}
      sx={{
        display: 'flex',
        position: 'absolute',
        transform: `translateY(${virtualRow.start}px)`,
        width: '100%',
      }}
      hover
    >
      {row.getVisibleCells().map((cell) => {
        return (
          <TableCell
            key={cell.id}
            sx={{
              flex: `0 0 ${cell.column.getSize()}px`, // Uses React Table's calculated size
              minWidth: `${cell.column.columnDef.minSize}px`,
              maxWidth: `${cell.column.columnDef.maxSize}px`,
              flexGrow: 1,
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        );
      })}
    </TableRow>
  );
}
