import React from "react";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <main style={{ height: "100%" }}>
      <Outlet />
    </main>
  );
};

export default Layout;
