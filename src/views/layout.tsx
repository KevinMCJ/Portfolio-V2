import { Navbar, ThemeButton } from "../components/common";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Fragment>
      <header>
        <Navbar />
      </header>
      <main className="min-h-[calc(100dvh-8rem)]">
        <Outlet />
        <ThemeButton />
      </main>
    </Fragment>
  );
};

export default Layout;
