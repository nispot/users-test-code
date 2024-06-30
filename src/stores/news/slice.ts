import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { NewsList } from '../../pages/news/types/types';
import { getNews } from '../../services/newsServices';

interface NewsState {
  news: NewsList;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  loading: boolean;
}

const initialState: NewsState = {
  news: [],
  status: 'idle',
  error: null,
  loading: false,
};

export const fetchNews: AsyncThunk<NewsList, void, object> =
  createAsyncThunk<NewsList>(
    'news/fetchNews',
    async (_, { rejectWithValue }) => {
      try {
        const response = await getNews();
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
    },
  );

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchNews.fulfilled,
        (state, action: PayloadAction<NewsList>) => {
          state.news = action.payload;
          state.status = 'succeeded';
          state.loading = false;
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

export const { setLoading, setError } = newsSlice.actions;

export default newsSlice.reducer;
export type { NewsState };
