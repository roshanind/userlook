import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

import { User } from '@type/user.types';
import { selectUsers, useFetchUsersQuery } from '@store/slices/users.slice';
import AgeDistributionChart from '@globals/Graphs/AgeDistributionChart';
import UserBirthMonthDistributionChart from '@globals/Graphs/UserBirthMonthDistributionChart';

import { Avatar, CircularProgress, Grid, Paper, Typography } from '@ui';
import VirtualizedTable, { ColumnDef } from '@ui/VirtualizedTable';

export default function Dashboard() {
  const { isLoading } = useFetchUsersQuery();
  const users = useSelector(selectUsers);

  const columnConfig = useMemo<Array<ColumnDef<User>>>(
    () => [
      { accessorKey: 'id', header: 'ID', size: 50, maxSize: 50, minSize: 50 },
      {
        accessorKey: 'profileImage',
        header: 'Profile Image',
        cell: (info) =>
          info.getValue() ? <Avatar sx={{ width: 24, height: 24 }} src={info.getValue() as string} /> : null,
        size: 100,
        minSize: 100,
        maxSize: 100,
      },
      { accessorKey: 'firstName', header: 'First Name', size: 100, minSize: 100, maxSize: 200 },
      { accessorKey: 'lastName', header: 'Last Name', size: 100, minSize: 100, maxSize: 200 },
      { accessorKey: 'age', header: 'Age', size: 50, minSize: 50 },
      { accessorKey: 'gender', header: 'Gender', size: 100, minSize: 50 },
      { accessorKey: 'birthday', header: 'Birthday', size: 100, minSize: 100 },
      { accessorKey: 'city', header: 'City', size: 100, minSize: 100 },
      { accessorKey: 'country', header: 'Country', size: 100, minSize: 100 },
      { accessorKey: 'nic', header: 'NIC', size: 100, minSize: 100 },
      { accessorKey: 'phoneNumber', header: 'Phone Number', size: 100, minSize: 100 },
    ],
    []
  );

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant="h1" margin={0}>
          {isLoading && <CircularProgress size={32} sx={{ mr: 2 }} />}
          Welcome
        </Typography>
        <Typography variant="body1">{format(new Date(), 'do MMMM yyyy')}</Typography>
      </Grid>
      <Grid size={{ xs: 12, lg: 6 }}>
        <Paper sx={{ height: '100%' }} variant='outlined'>
          <AgeDistributionChart users={users} />
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, lg: 6 }}>
        <Paper variant='outlined'>
          <UserBirthMonthDistributionChart users={users} />
        </Paper>
      </Grid>
      <Grid size={12}>
        <Paper variant='outlined'>
          <VirtualizedTable<User> data={users.slice(0, 5)} columns={columnConfig} />
        </Paper>
      </Grid>
    </Grid>
  );
}
