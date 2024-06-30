import { configureStore } from '@reduxjs/toolkit';
/* import newsReducer, { NewsState } from './news/slice';
import usersReducer, { UsersState } from './users/slice';
 */
import newsReducer from './news/slice';
import usersReducer from './users/slice';
export const store = configureStore({
  reducer: {
    users: usersReducer,
    news: newsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
/* export type RootState = {
  users: UsersState;
  news: NewsState;
};
export type AppDispatch = typeof store.dispatch; */
