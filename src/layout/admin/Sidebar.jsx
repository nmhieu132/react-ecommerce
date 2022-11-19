import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div id="layoutSidenav_nav">
      <nav
        className="sb-sidenav accordion sb-sidenav-light"
        id="sidenavAccordion"
      >
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Core</div>

            <Link className="nav-link" to="/admin/orders">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              Orders
            </Link>
            <Link className="nav-link" to="/admin/add-categor">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              Add Category
            </Link>
            <Link className="nav-link" to="/admin/view-categor">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              View Category
            </Link>
            <Link
              className="nav-link collapsed"
              to="#"
              data-bs-toggle="collapse"
              data-bs-target="#Product"
              aria-expanded="false"
              aria-controls="Product"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-columns"></i>
              </div>
              Product
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </Link>
            <div
              className="collapse"
              id="Product"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <Link className="nav-link" to="/admin/add-product">
                  Add Product
                </Link>
                <Link className="nav-link" to="/admin/view-product">
                  View Product
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
