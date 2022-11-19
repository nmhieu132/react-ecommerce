import axios from "axios";
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import swal from "sweetalert";
import { useState } from "react";
import { BsFillBagDashFill } from "react-icons/bs";
import Typography from "@mui/material/Typography";
import Dropdown from "react-bootstrap/Dropdown";
function NavBarHome() {
  const [showNavbar, setShowNavBar] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const history = useHistory();

  const logoutSubmit = (e) => {
    e.preventDefault();

    axios.get("/sanctum/csrf-cookie/").then((response) => {
      axios.post(`/api/logout`).then((res) => {
        if (res.data.status === 200) {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_name");
          swal("Success", res.data.message, "success");
          history.push("/");
        } else {
        }
      });
    });
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setShowNavBar(false);
      } else {
        setShowNavBar(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  var logio = "";

  if (!localStorage.getItem("auth_token")) {
    logio = (
      <Link className=" ps-2 text-black" to="/login">
        <BiLogIn size={25} />
      </Link>
    );
  } else {
    logio = (
      <div onClick={logoutSubmit}>
        <BiLogOut className="logout-icon" size={25} />
      </div>
    );
  }
  return (
    <nav
      className={`${
        showNavbar
          ? "navbar navbar-expand-lg navbar-light bg-light shadow sticky-top"
          : "bg-transparent"
      }`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold " to="/">
          <h2>Snicker</h2>
        </Link>
        <div
          className="navbar-menu collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link " aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="collection nav-item">
              <Dropdown
                onMouseLeave={() => setShowDropdown(false)}
                onMouseOver={() => setShowDropdown(true)}
              >
                <Dropdown.Toggle variant="none">
                  {/* <Link
                    to="/collections"
                    className="text-decoration-none text-reset"
                  > */}
                  Collection
                  {/* </Link> */}
                </Dropdown.Toggle>

                <Dropdown.Menu show={showDropdown}>
                  <Dropdown.Item>
                    <Link className="nav-link" to="/collections/Men">
                      Men
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <Link className="nav-link" to="/collections/Women">
                      Women
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    {" "}
                    <Link className="nav-link" to="/collections/Kids">
                      Kids
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item me-3">
              <Link to="/checkout">
                <div>
                  <BsFillBagDashFill className="bag-icon" size={20} />
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <div>{logio}</div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBarHome;
