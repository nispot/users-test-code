import { Outlet } from 'react-router-dom';
import '../App.css';
import '../i18n';
import { Header } from './Header';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
