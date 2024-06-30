import { Outlet } from 'react-router-dom';
import '../App.css';
import '../i18n';
import { Footer } from './Footer';
import { Header } from './Header';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto mx-10">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
