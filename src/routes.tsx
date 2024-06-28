import App from './App';
import { Users } from './pages/users/Users';

export default [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/users',
    element: <Users />,
  },
];
