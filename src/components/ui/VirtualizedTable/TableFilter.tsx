import { ColumnDef } from '@tanstack/react-table';
import { Box, Button, FormControl, InputLabel, MenuItem, Popover, Select, Stack, TextField } from '@ui';
import { useState } from 'react';

interface Props<T> {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  column: ColumnDef<T>;
  onFilter: (value: unknown) => void;
  currentFilter: unknown;
}

export default function TableFilter<T>({ anchorEl, onClose, column, onFilter, currentFilter }: Props<T>) {
  const [filterValue, setFilterValue] = useState(currentFilter || '');

  const handleApplyFilter = () => {
    onFilter(filterValue);
    onClose();
  };

  const handleClearFilter = () => {
    setFilterValue('');
    onFilter('');
    onClose();
  };

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <Box sx={{ p: 2, width: 250 }}>
        <Stack spacing={2}>
          {column.id === 'status' ? (
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select value={filterValue} onChange={(e) => setFilterValue(e.target.value)} label="Status">
                <MenuItem value="">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <TextField
              size="small"
              label={`Filter by ${column.id}`}
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              fullWidth
            />
          )}
          <Stack direction="row" spacing={1}>
            <Button variant="contained" size="small" onClick={handleApplyFilter} fullWidth>
              Apply
            </Button>
            <Button variant="outlined" size="small" onClick={handleClearFilter} fullWidth>
              Clear
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Popover>
  );
}
