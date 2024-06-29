import { AddUser } from './pages/users/AddUser';
import { EditUser } from './pages/users/EditUser';
import { Users } from './pages/users/Users';
import { ViewUser } from './pages/users/ViewUser';

import Layout from './components/Layout';

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
    ],
  },
];
