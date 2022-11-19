import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Editcategor(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);
  const [categoryInput, setCategoryInput] = useState([]);
  useEffect(() => {
    const categoryId = props.match.params.id;
    console.log(categoryId);
    axios.get(`/api/edit-category/${categoryId}`).then((res) => {
      if (res.data.status === 200) {
        setCategoryInput(res.data.category);
        console.log(res.data.category);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "eror");
        history.push("/admin/view-category");
      }
      setLoading(false);
    });
  }, [props.match.params.id, history]);
  const handleInput = (e) => {
    e.persist();
    setCategoryInput({ ...categoryInput, [e.target.name]: e.target.value });
  };
  const updateCategor = (e) => {
    e.preventDefault();
    const categoryId = props.match.params.id;
    const data = categoryInput;
    axios.put(`/api/update-category/${categoryId}`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "Edit successfully");
        setError([]);
      } else if (res.data.status === 422) {
        swal("All fields are required", "", "Error");
        setError(res.data.errors);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "Error");
        history.push("admin/view-categor");
      }
    });
  };
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          marginTop: "300px",
          alignItems: "center",
          justifyContent: "center",
          color: "black",
        }}
      >
        <CircularProgress sx={{ width: " 100px", color: "inherit" }} />
      </Box>
    );
  }
  return (
    <div className="container px-5">
      <div className="card mt-4">
        <div className="card-header">
          <h4 className="mt-4">
            Edit Category
            <Link
              to="/admin/view-categor"
              className="btn btn-primary btn-sm float-end"
            >
              View Category
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={updateCategor}>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="home-tab-pane"
                  aria-selected="true"
                >
                  Home
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="seo-tag-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#seo-tag"
                  type="button"
                  role="tab"
                  aria-controls="profile-tab-pane"
                  aria-selected="false"
                >
                  SEO
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane card-body border fade show active"
                id="home-tab-pane"
                role="tabpanel"
                aria-labelledby="home-tab"
                tabindex="0"
              >
                <div className="form-group mb-3 mx-auto">
                  <label>Slug</label>
                  <input
                    type="text"
                    name="slug"
                    onChange={handleInput}
                    value={categoryInput.slug}
                    className="form-control"
                  />
                  <span className="text-danger">{error.slug}</span>
                </div>
                <div className="form-group mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleInput}
                    value={categoryInput.name}
                    className="form-control"
                  />
                  <span className="text-danger">{error.name}</span>
                </div>
                <div className="form-group mb-3">
                  <label>Description</label>
                  <textarea
                    name="description"
                    onChange={handleInput}
                    value={categoryInput.description}
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Status</label>
                  <input
                    type="checkbox"
                    name="status"
                    onChange={handleInput}
                    value={categoryInput.status}
                  />
                </div>
              </div>
              <div
                className="tab-pane card-body border fade"
                id="seo-tag"
                role="tabpanel"
                aria-labelledby="seo-tag-tab"
                tabindex="0"
              >
                <div className="form-group mb-3">
                  <label>Meta title</label>
                  <textarea
                    name="meta_title"
                    onChange={handleInput}
                    value={categoryInput.meta_title}
                    className="form-control"
                  ></textarea>
                  <span className="text-danger">{error.meta_title}</span>
                </div>
                <div className="form-group mb-3">
                  <label>Meta keywords</label>
                  <textarea
                    name="meta_keyword"
                    onChange={handleInput}
                    value={categoryInput.meta_keyword}
                    className="form-control"
                  ></textarea>
                </div>
                <div className="form-group mb-3">
                  <label>Meta description</label>
                  <textarea
                    name="meta_description"
                    onChange={handleInput}
                    value={categoryInput.meta_description}
                    className="form-control"
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary px-4 float-end mb-3"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Editcategor;
