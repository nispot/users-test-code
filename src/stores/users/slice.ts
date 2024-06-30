import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { User, UserWithId } from '../../pages/users/types/types';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../../services/usersServices';

interface UsersState {
  users: UserWithId[];
  currentUser: UserWithId | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  saveStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  loading: boolean;
  page: number;
}

const initialState: UsersState = {
  users: [],
  currentUser: null,
  status: 'idle',
  saveStatus: 'idle',
  error: null,
  loading: false,
  page: 1,
};

export const fetchUsers: AsyncThunk<UserWithId[], void, object> =
  createAsyncThunk<UserWithId[]>(
    'users/fetchUsers',
    async (_, { rejectWithValue }) => {
      try {
        const response = await getUsers();
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
    },
  );

export const fetchUser: AsyncThunk<UserWithId, string, object> =
  createAsyncThunk<UserWithId, string>(
    'users/fetchUser',
    async (id, { rejectWithValue }) => {
      try {
        const response = await getUser(id);
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
    },
  );

export const removeUser: AsyncThunk<UserWithId, string, object> =
  createAsyncThunk<UserWithId, string>(
    'users/deleteUser',
    async (id, { rejectWithValue }) => {
      try {
        const response = await deleteUser(id);
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
    },
  );

export const editUser: AsyncThunk<UserWithId, UserWithId, object> =
  createAsyncThunk<UserWithId, UserWithId>(
    'users/editUser',
    async (user, { rejectWithValue }) => {
      try {
        const response = await updateUser(user);
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
    },
  );

export const addUser: AsyncThunk<UserWithId, User, object> = createAsyncThunk<
  UserWithId,
  User
>('users/editUser', async (user, { rejectWithValue }) => {
  try {
    const response = await createUser(user);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.status = 'idle';
    },
    setSaveStatus: (
      state,
      action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>,
    ) => {
      state.saveStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<UserWithId[]>) => {
          state.users = action.payload;
          state.status = 'succeeded';
          state.loading = false;
        },
      )
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<UserWithId>) => {
          state.currentUser = action.payload;
          state.loading = false;
          state.status = 'succeeded';
        },
      )
      .addCase(
        removeUser.fulfilled,
        (state, action: PayloadAction<UserWithId>) => {
          state.users = state.users.filter(
            (user) => user.id !== action.payload.id,
          );
          state.loading = false;
          state.status = 'succeeded';
        },
      )
      .addCase(
        editUser.fulfilled,
        (state, action: PayloadAction<UserWithId>) => {
          state.currentUser = action.payload;
          state.loading = false;
          state.saveStatus = 'succeeded';
        },
      )
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
          state.loading = true;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action: PayloadAction<{ message: string }>) => {
          state.error = action.payload.message;
          state.status = 'failed';
          state.loading = false;
        },
      );
  },
});

export const { setLoading, setPage, setError, setSaveStatus } =
  usersSlice.actions;

export default usersSlice.reducer;
export type { UsersState };
