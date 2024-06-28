import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { getUser, getUsers } from '../../services/usersServices';
import { UserWithId } from '../../types/types';

interface UsersState {
  users: UserWithId[];
  currentUser: UserWithId | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  loading: boolean;
  page: number;
}

const initialState: UsersState = {
  users: [],
  currentUser: null,
  status: 'idle',
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
          state.status = 'succeeded';
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

export const { setLoading, setPage } = usersSlice.actions;

export default usersSlice.reducer;
