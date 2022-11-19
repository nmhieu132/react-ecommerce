import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function Categor() {
  const [categoryInput, setCategoryInput] = useState({
    slug: "",
    name: "",
    descr: "",
    status: "",
    meta_title: "",
    meta_keyword: "",
    meta_descr: "",
    error_list: [],
  });
  const submitAddCategory = (e) => {
    e.preventDefault();
    const data = {
      slug: categoryInput.slug,
      name: categoryInput.name,
      descr: categoryInput.descr,
      status: categoryInput.status,
      meta_title: categoryInput.meta_title,
      meta_keyword: categoryInput.meta_keyword,
      meta_descr: categoryInput.meta_descr,
    };
    axios.post(`/api/add-category`, data).then((res) => {
      console.log(res.data);
      if (res.data.status === 200) {
        swal("Add successfully", res.data.message, "success");
        document.getElementById("CATEGORY").reset();
      } else if (res.data.status === 400) {
        setCategoryInput({ ...categoryInput, error_list: res.data.errors });
      }
    });
  };
  const handleInput = (e) => {
    e.persist();
    setCategoryInput({ ...categoryInput, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid mt-4 px-6">
      <div className="card mt-4">
        <div className="card-header">
          <h4 className="mt-4">
            Add Category
            <Link
              to="/admin/view-categor"
              className="btn btn-primary btn-sm float-end"
            >
              View Category
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={submitAddCategory} id="CATEGORY">
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
                  <span>{categoryInput.error_list.slug}</span>
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
                  <span>{categoryInput.error_list.name}</span>
                </div>
                <div className="form-group mb-3">
                  <label>Description</label>
                  <textarea
                    name="descr"
                    onChange={handleInput}
                    value={categoryInput.descr}
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
                  <span>{categoryInput.error_list.meta_title}</span>
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
                    name="meta_descr"
                    onChange={handleInput}
                    value={categoryInput.meta_descr}
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

export default Categor;
