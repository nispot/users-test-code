import { AddUser } from './pages/users/AddUser';
import { EditUser } from './pages/users/EditUser';
import { Users } from './pages/users/Users';
import { ViewUser } from './pages/users/ViewUser';

import Layout from './components/Layout';
import { NewsList } from './pages/news/NewsList';
import { ViewNews } from './pages/news/ViewNews';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Users />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'view-user/:id',
        element: <ViewUser />,
      },
      {
        path: 'edit-user/:id',
        element: <EditUser />,
      },
      {
        path: 'add-user',
        element: <AddUser />,
      },
      {
        path: 'news',
        element: <NewsList />,
      },
      {
        path: 'news/:id',
        element: <ViewNews />,
      },
    ],
  },
];
