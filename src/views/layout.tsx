import { Navbar, ThemeButton } from '../components/common';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <main>
      <Navbar />
      <Outlet />
      <ThemeButton />
    </main>
  );
};

export default Layout;
