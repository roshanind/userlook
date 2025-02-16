import { flexRender, Table } from '@tanstack/react-table';

import { Box, TableCell, TableHead, TableRow } from '@ui';
import { KeyboardArrowDownIcon, KeyboardArrowUpIcon } from '@ui/icons';


type Props<T> = {
  table: Table<T>;
};

/**
 * A functional component that renders the header of a virtualized table.
 * 
 * @template T - The type of data used in the table.
 * @param {Props<T>} props - The properties passed to the component.
 * @param {TableInstance<T>} props.table - The table instance containing header groups and headers.
 * 
 * @returns {JSX.Element} The rendered table header.
 * 
 */
export default function VirtualizedTableHeader<T>({ table }: Props<T>) {
  return (
    <TableHead sx={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'background.paper' }}>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} sx={{ display: 'flex' }}>
          {headerGroup.headers.map((header) => {
            return (
              <TableCell
                variant='head'
                key={header.id}
                sx={{
                  flex: `0 0 ${header.column.getSize()}px`, // Uses React Table's calculated size
                  minWidth: `${header.column.columnDef.minSize}px`,
                  maxWidth: `${header.column.columnDef.maxSize}px`,
                  flexGrow: 1,
                }}
              >
                <div
                  className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ cursor: 'pointer'}}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: <KeyboardArrowUpIcon />,
                      desc: <KeyboardArrowDownIcon />,
                    }[header.column.getIsSorted() as string] ?? null}
                  </Box>
                </div>
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableHead>
  );
}
