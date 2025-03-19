import { Navbar, ThemeButton } from "../components/common";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Fragment>
      <header>
        <Navbar />
      </header>
      <main className="min-h-screen">
        <Outlet />
        <ThemeButton />
      </main>
    </Fragment>
  );
};

export default Layout;
