import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { number, string } from 'yup';
import { useLocation, useNavigate, useParams } from 'react-router';

import { FILED_TYPE, FORM_MODE } from '@constants/form.constants';
import { GENDER } from '@constants/user.constants';
import { FormMode } from '@type/form.types';
import { User } from '@type/user.types';
import { usePageDetails } from '@providers/PageDetailsProvider';
import { selectUsers, useAddUserMutation, useUpdateUserMutation } from '@store/slices/users.slice';

import { Box, Button, CircularProgress } from '@ui';
import FormikForm from '@globals/Form/FormikForm';

type Props = {
  mode?: FormMode
};

export default function UsersViewEditCreate({ mode }: Props) {
  const { setTitle, setIsFixedLayout } = usePageDetails();
  const { id } = useParams();
  const { state } = useLocation();
  const [formMode] = useState(mode || state?.mode || FORM_MODE.CREATE);
  const navigate = useNavigate();
  const users = useSelector(selectUsers);
  const [updateUser] = useUpdateUserMutation();
  const [createUser] = useAddUserMutation();

  const user = id ? users.find((user) => user.id === parseInt(id)) : null;
  setTitle(user ? `${user.firstName} ${user.lastName}` : 'Add User');

  useEffect(() => {
    setIsFixedLayout(false);
  }, []);

  const handleOnSubmit = async (values: User) => {
    if (formMode === FORM_MODE.CREATE) {
      const result = await createUser(values);
      navigate('/manage-users', { state: { id: result.data?.user.id } });
    } else if (user){
      const result = await updateUser({ ...values, id: user.id});
      navigate('/manage-users', { state: { id: result.data?.user.id, isScrollAuto: true } });
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <FormikForm<User>
        fields={[
          {
            id: 'firstName',
            label: 'First Name',
            type: FILED_TYPE.INPUT,
            initialValue: user?.firstName || '',
            validation: string().required('First name is required'),
          },
          {
            id: 'lastName',
            label: 'Last Name',
            type: FILED_TYPE.INPUT,
            initialValue: user?.lastName || '',
            validation: string().required('Last name is required'),
          },
          {
            id: 'age',
            label: 'Age',
            type: FILED_TYPE.INPUT,
            initialValue: user?.age || 0,
            validation: number().required('Age is required'),
          },
          {
            id: 'gender',
            label: 'Gender',
            type: FILED_TYPE.OPTIONS,
            initialValue: user?.gender || '',
            options: [
              { label: 'Male', value: GENDER.MALE },
              { label: 'Female', value: GENDER.FEMALE },
              { label: 'Other', value: GENDER.OTHER },
            ],
            validation: string().oneOf(Object.values(GENDER)).required(),
          },
          {
            id: 'birthday',
            label: 'Birthday',
            type: FILED_TYPE.INPUT,
            initialValue: user?.birthday || '',
            validation: string().required('Birthday is required'),
          },
          {
            id: 'city',
            label: 'City',
            type: FILED_TYPE.INPUT,
            initialValue: user?.city || '',
            validation: string().required('City is required'),
          },
          {
            id: 'country',
            label: 'Country',
            type: FILED_TYPE.INPUT,
            initialValue: user?.country || '',
            validation: string().required('Country is required'),
          },
          {
            id: 'nic',
            label: 'NIC',
            type: FILED_TYPE.INPUT,
            initialValue: user?.nic || '',
            validation: number().required('NIC is required'),
          },
          {
            id: 'phoneNumber',
            label: 'Phone Number',
            type: FILED_TYPE.INPUT,
            initialValue: user?.phoneNumber || '',
            validation: number().required('Phone number is required'),
          },
        ]}
        mode={formMode}
        onSubmit={handleOnSubmit}
        formActions={({ isValid, submitForm, isSubmitting }) => (
          <>
            <Button type="submit" color="secondary" variant="outlined" disabled={isSubmitting} onClick={() => {
              navigate('/manage-users', { state: { id: user?.id, isScrollAuto: true } });
            }}>
              Cancel
            </Button>
            <Button type="submit" color="primary" onClick={submitForm} disabled={!isValid || isSubmitting}>
              {isSubmitting && <CircularProgress size={16} sx={{ mr: 1 }} />}
              Submit
            </Button>
          </>
        )}
      />
    </Box>
  );
}
