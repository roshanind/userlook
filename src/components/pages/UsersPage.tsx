import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import { User } from '@type/user.types';
import { FORM_MODE } from '@constants/form.constants';
import { usePageDetails } from '@providers/PageDetailsProvider';
import { selectUsers, useDeleteUserMutation, useFetchUsersQuery } from '@store/slices/users.slice';

import { Avatar, Button, CircularProgress, Grid, IconButton } from '@ui';
import VirtualizedTable, { ColumnDef } from '@ui/VirtualizedTable';
import { DeleteIcon, EditIcon, PersonAddIcon } from '@ui/icons';

export default function UsersPage() {
  const { setIsFixedLayout, setTitle } = usePageDetails();
  const { isLoading } = useFetchUsersQuery();
  const users = useSelector(selectUsers);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [deleteUser, { isLoading: isUserDeleting, originalArgs }] = useDeleteUserMutation();

  useEffect(() => {
    setIsFixedLayout(true);
    setTitle('Manage Users');
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
      { accessorKey: 'gender', header: 'Gender', size: 100, minSize: 50 },
      { accessorKey: 'birthday', header: 'Birthday', size: 100, minSize: 100 },
      { accessorKey: 'city', header: 'City', size: 100, minSize: 100 },
      { accessorKey: 'country', header: 'Country', size: 100, minSize: 100 },
      { accessorKey: 'nic', header: 'NIC', size: 100, minSize: 100 },
      { accessorKey: 'phoneNumber', header: 'Phone Number', size: 100, minSize: 100 },
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => (
          <>
            <IconButton
              size="small"
              onClick={() => navigate(`edit-user/${row.original.id}`, { state: { mode: FORM_MODE.EDIT } })}
              color="primary"
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => deleteUser(row.original.id)}
              color="error"
            >
              {isUserDeleting && originalArgs === row.original.id ? <CircularProgress size={16} /> : <DeleteIcon fontSize="small" />}
            </IconButton>
          </>
        ),
      },
    ],
    [deleteUser, isUserDeleting, navigate, originalArgs]
  );

  return (
    <Grid container sx={{ width: '100%', flexDirection: 'column', flexWrap: 'nowrap' }}>
      <Grid size={12} display="flex" justifyContent="space-between" mb={2}>
        <Grid size={{ xs: 12, lg: 6 }}>{isLoading && <CircularProgress size={16} />}</Grid>
        <Grid size={{ xs: 12, lg: 6 }} display="flex" justifyContent="flex-end">
            <Button
              size="small"
              onClick={() => navigate('create-user', { state: { mode: FORM_MODE.CREATE } })}
              color="primary"
            >
              <PersonAddIcon fontSize="small" sx={{ mr: 1 }} /> Add User
            </Button>
        </Grid>
      </Grid>
      <Grid size={12} sx={{ minHeight: 0, display: 'flex', justifyContent: 'flex-end' }}>
        <VirtualizedTable<User> data={users} columns={columnConfig} idAccessorKey="id" scrollToRowId={state?.id} isScrollAuto={state?.isScrollAuto} />
      </Grid>
    </Grid>
  );
}
