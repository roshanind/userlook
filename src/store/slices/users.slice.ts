import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@type/user.types';


interface UsersState {
    users: User[];
}

const initialState: UsersState = {
    users: [],
};

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({
        fetchUsers: builder.query<{ users: User[] }, void>({
            query: () => 'users',
            onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                    dispatch(usersSlice.actions.setUsers(data?.users));
                } catch (error) {
                    console.error('Failed to fetch users:', error);
                }
            },
        }),
        addUser: builder.mutation<User, Partial<User>>({
            query: (newUser) => ({
                url: 'users',
                method: 'POST',
                body: newUser,
            }),
            onQueryStarted: async (newUser, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(usersSlice.actions.addUser(data));
                } catch (error) {
                    console.error('Failed to add user:', error);
                }
            },
        }),
        updateUser: builder.mutation<User, Partial<User>>({
            query: (updatedUser) => ({
                url: `users/${updatedUser.id}`,
                method: 'PUT',
                body: updatedUser,
            }),
            onQueryStarted: async (updatedUser, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(usersSlice.actions.updateUser(data));
                } catch (error) {
                    console.error('Failed to update user:', error);
                }
            },
        }),
        deleteUser: builder.mutation<{ id: number }, number>({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
            onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    dispatch(usersSlice.actions.deleteUser(id));
                } catch (error) {
                    console.error('Failed to delete user:', error);
                }
            },
        }),
    }),
});

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        addUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload);
        },
        updateUser: (state, action: PayloadAction<User>) => {
            const index = state.users.findIndex((user) => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
        deleteUser: (state, action: PayloadAction<number>) => {
            state.users = state.users.filter((user) => user.id !== action.payload);
        },
    },
});

export const { useFetchUsersQuery, useAddUserMutation, useUpdateUserMutation, useDeleteUserMutation } = usersApi;
export const { setUsers, addUser, updateUser, deleteUser } = usersSlice.actions;

export const selectUsers = (state: { users: UsersState }) => state.users.users;

export default usersSlice.reducer;