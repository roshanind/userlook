import { useEffect, useMemo } from 'react';
import { usePageDetails } from '@providers/PageDetailsProvider';
import { selectUsers, useFetchUsersQuery } from '@store/slices/users.slice';
import { User } from '@type/user.types';
import { Avatar, Box, CircularProgress } from '@ui';
import VirtualizedTable, { ColumnDef } from '@ui/VirtualizedTable';
import { useSelector } from 'react-redux';

export default function UsersPage() {
  const { setIsFixedLayout } = usePageDetails();
  const { isLoading } = useFetchUsersQuery();
  const users = useSelector(selectUsers);

  useEffect(() => {
    setIsFixedLayout(true);
  }, []);

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
      { accessorKey: 'birthday', header: 'Birthday', size: 100, minSize: 100 },
      { accessorKey: 'city', header: 'City', size: 100, minSize: 100 },
      { accessorKey: 'country', header: 'Country', size: 100, minSize: 100 },
      { accessorKey: 'nic', header: 'NIC', size: 100, minSize: 100 },
      { accessorKey: 'phoneNumber', header: 'Phone Number', size: 100, minSize: 100 },
    ],
    []
  );

  return (
    <Box sx={{ width: '100%' }}>
      {isLoading && <CircularProgress size={16} />}
      <VirtualizedTable<User> key={new Date().toISOString()} data={users} columns={columnConfig} />
    </Box>
  );
}
