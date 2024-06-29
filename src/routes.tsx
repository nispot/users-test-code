import App from './App';
import { Users } from './pages/users/Users';
import { ViewUser } from './pages/users/ViewUser';

export default [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/users',
    element: <Users />,
  },
  {
    path: '/view-user/:id',
    element: <ViewUser />,
  },
];
