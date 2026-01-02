import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="flex-col flex min-h-screen">
      <header>
        <Navbar />
      </header>
      <main className="flex-1 overflow-y-auto flex">
        <Outlet />
      </main>
      <footer className="shrink-0">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
