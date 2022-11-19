import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
function Register() {
  const history = useHistory();

  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: register.name,
      email: register.email,
      password: register.password,
    };
    console.log(data);

    axios.get("/sanctum/csrf-cookie/").then((response) => {
      console.log(response);
      axios.post(`/api/register`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          swal("Success", res.data.message, "success");
          history.push("/");
        } else {
          setRegister({
            ...register,
            error_list: res.data.validation_errors,
          });
        }
      });
    });
  };

  return (
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="text-center font-weight-light my-4">
                    Register
                  </h4>
                </div>
                <div className="card-body">
                  <form onSubmit={registerSubmit}>
                    <div className="form-group mb-3">
                      <label>Full Name</label>
                      <input
                        type=""
                        name="name"
                        onChange={handleInput}
                        value={register.name}
                        className="form-control"
                      ></input>
                      <span>{register.error_list.name}</span>
                    </div>
                    <div className="form-group mb-3">
                      <label>Email</label>
                      <input
                        type=""
                        name="email"
                        onChange={handleInput}
                        value={register.email}
                        className="form-control"
                      ></input>
                      <span>{register.error_list.email}</span>
                    </div>
                    <div className="form-group mb-3">
                      <label>Password</label>
                      <input
                        type=""
                        name="password"
                        onChange={handleInput}
                        value={register.password}
                        className="form-control"
                      ></input>
                      <span>{register.error_list.password}</span>
                    </div>
                    <div className="mt-4 mb-0">
                      <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                          Sign up
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="card-footer text-center py-3">
                  <div className="small">
                    <Link to="/login">Have an account? Go to login</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <footer className="py-4 bg-dark mt-auto">
          <div className="container-fluid px-4">
            <div className="d-flex align-items-center justify-content-between small">
              <div className="text-muted">
                Copyright &copy; Your Website 2022
              </div>
              <div>
                <Link to="#">Privacy Policy</Link>
                &middot;
                <Link to="#">Terms &amp; Conditions</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Register;
