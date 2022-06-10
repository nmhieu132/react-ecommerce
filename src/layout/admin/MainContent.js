import React from "react";
import "../../assets/admin/css/styles.css";
import "../../assets/admin/js/scripts.js";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function MainContent({ children }) {
  return (
    <div id="sb-nav-fixed">
      <Navbar />
      <div id="layoutSidenav">
        <Sidebar />
        <div id="layoutSidenav_content">
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default MainContent;
