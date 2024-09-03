import { Navbar, ThemeButton } from "../components/common";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Fragment>
      <Navbar />
      <main>
        <Outlet />
        <ThemeButton />
      </main>
    </Fragment>
  );
};

export default Layout;
