import App from "./App";
import { Users } from "./pages/Users";

export default [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/users",
    element: <Users />,
  },
];
