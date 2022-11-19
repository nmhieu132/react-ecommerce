import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Editproduct(props) {
  const history = useHistory();
  const [categoryList, setCategoryList] = useState([]);
  const [errorList, setErrorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkBox, setCheckBox] = useState([]);
  const [productInput, setProductInput] = useState({
    categoryId: "",
    slug: "",
    name: "",
    descr: "",
    meta_title: "",
    meta_keyword: "",
    meta_descr: "",
    selling_price: "",
    original_price: "",
    quantity: "",
    brand: "",
  });

  const [images, setImages] = useState([]);
  const handleImage = (e) => {
    setImages({ image: e.target.files[0] });
  };

  const handleInput = (e) => {
    e.persist();
    setProductInput({ ...checkBox, [e.target.name]: e.target.value });
  };

  const handleCheck = (e) => {
    e.persist();
    setCheckBox({ ...checkBox, [e.target.name]: e.target.checked });
  };
  useEffect(() => {
    axios.get(`/api/all-category`).then((res) => {
      if (res.data.status === 200) {
        setCategoryList(res.data.category);
      }
    });

    const productId = props.match.params.id;
    axios.get(`/api/edit-product/${productId}`).then((res) => {
      if (res.data.status === 200) {
        setProductInput(res.data.products);
        setCheckBox(res.data.products);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        history.push("/admin/view-product");
      }
      setLoading(false);
    });
  }, [props.match.params.id]);
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
  const updateProduct = (e) => {
    e.preventDefault();

    const productId = props.match.params.id;

    const dataForm = new FormData();
    dataForm.append("image", images.image);
    dataForm.append("categoryId", productInput.categoryId);
    dataForm.append("slug", productInput.slug);
    dataForm.append("name", productInput.name);
    dataForm.append("descr", productInput.descr);
    dataForm.append("meta_title", productInput.meta_title);
    dataForm.append("meta_keyword", productInput.meta_keyword);
    dataForm.append("meta_descr", productInput.meta_descr);
    dataForm.append("selling_price", productInput.selling_price);
    dataForm.append("original_price", productInput.selling_price);
    dataForm.append("quantity", productInput.quantity);
    dataForm.append("brand", productInput.brand);
    dataForm.append("featured", checkBox.featured ? "1" : "0");
    dataForm.append("popular", checkBox.popular ? "1" : "0");
    dataForm.append("status", checkBox.status ? "1" : "0");
    axios.post(`/api/update-product/${productId}`, dataForm).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "Product Updated");
        setErrorList([]);
      } else if (res.data.status === 422) {
        swal("All fields are required", "", "error");
        setErrorList(res.data.errors);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "Product Not Found");
        history.push("/admin/view-product");
      }
    });
  };

  return (
    <div className="container-fluid px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            Edit Product
            <Link
              to="/admin/view-product"
              className="btn btn-primary btn-sm float-end"
            >
              View Product
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <form encType="multipart/form-data" onSubmit={updateProduct}>
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
                  id="seo-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#seo"
                  type="button"
                  role="tab"
                  aria-controls="seo"
                  aria-selected="false"
                >
                  SEO
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="details-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#details"
                  type="button"
                  role="tab"
                  aria-controls="details"
                  aria-selected="false"
                >
                  More details
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane card-body border fade show active"
                id="home-tab-pane"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="form-group mb-3">
                  <label>Select Category</label>
                  <select
                    name="categoryId"
                    onChange={handleInput}
                    value={productInput.categoryId}
                    className="form-control"
                  >
                    <option>Select Category</option>
                    {categoryList.map((item) => {
                      return (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  <span className="text-danger">{errorList.categoryId}</span>
                </div>
                <div className="form-group mb-3">
                  <label>Slug</label>
                  <input
                    type="text"
                    onChange={handleInput}
                    value={productInput.slug}
                    name="slug"
                    className="form-control"
                  />
                  <span className="text-danger">{errorList.slug}</span>
                </div>
                <div className="form-group mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    onChange={handleInput}
                    value={productInput.name}
                    name="name"
                    className="form-control"
                  />
                  <span className="text-danger">{errorList.name}</span>
                </div>
                <div className="form-group mb-3">
                  <label>Description</label>
                  <input
                    type="text"
                    onChange={handleInput}
                    value={productInput.descr}
                    name="descr"
                    className="form-control"
                  />
                </div>
              </div>
              <div
                className="tab-pane card-body border fade"
                id="seo"
                role="tabpanel"
                aria-labelledby="seo-tab"
              >
                <div className="form-group mb-3">
                  <label>Meta Title</label>
                  <input
                    type="text"
                    name="meta_title"
                    className="form-control"
                    onChange={handleInput}
                    value={productInput.meta_title}
                  />
                  <span className="text-danger">{errorList.meta_title}</span>
                </div>
                <div className="form-group mb-3">
                  <label>Meta Keyword</label>
                  <input
                    type="text"
                    name="meta_keyword"
                    className="form-control"
                    onChange={handleInput}
                    value={productInput.meta_keyword}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Meta Description</label>
                  <input
                    type="text"
                    name="meta_descr"
                    className="form-control"
                    onChange={handleInput}
                    value={productInput.meta_descr}
                  />
                </div>
              </div>
              <div
                className="tab-pane card-body border fade"
                id="details"
                role="tabpanel"
                aria-labelledby="details-tab"
                tabindex="0"
              >
                <div className="row">
                  <div className="col-md-4 form-group mb-3">
                    <label>Selling Price</label>
                    <input
                      type="text"
                      name="selling_price"
                      className="form-control"
                      onChange={handleInput}
                      value={productInput.selling_price}
                    />
                    <span className="text-danger">
                      {errorList.selling_price}
                    </span>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Original Price</label>
                    <input
                      type="text"
                      name="original_price"
                      className="form-control"
                      onChange={handleInput}
                      value={productInput.original_price}
                    />
                    <span className="text-danger">
                      {errorList.original_price}
                    </span>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Quantity</label>
                    <input
                      type="text"
                      name="quantity"
                      onChange={handleInput}
                      value={productInput.quantity}
                      className="form-control"
                    />
                    <span className="text-danger">{errorList.quantity}</span>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Brand</label>
                    <input
                      type="text"
                      onChange={handleInput}
                      value={productInput.brand}
                      name="brand"
                      className="form-control"
                    />
                    <span className="text-danger">{errorList.brand}</span>
                  </div>
                  <div className="col-md-8 form-group mb-3 w-50">
                    <label>Image</label>
                    <input
                      type="file"
                      onChange={handleImage}
                      name="image"
                      className="form-control"
                    />
                    <img
                      src={`http://localhost:8000/${productInput.image}`}
                      width="50px"
                      alt=""
                    />
                    <span className="text-danger">{errorList.image}</span>
                  </div>
                  <div className="col-md-3 form-group mb-3">
                    <label>Featured</label>
                    <input
                      type="checkbox"
                      name="featured"
                      onChange={handleCheck}
                      defaultChecked={checkBox.featured === 1 ? true : false}
                      className="w-50 h-50"
                    />
                  </div>
                  <div className="col-md-3 form-group mb-3">
                    <label>Popular</label>
                    <input
                      type="checkbox"
                      name="popular"
                      className="w-50 h-50"
                      onChange={handleCheck}
                      defaultChecked={checkBox.popular === 1 ? true : false}
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Hidden</label>
                    <input
                      type="checkbox"
                      name="status"
                      className="w-50 h-50"
                      onChange={handleCheck}
                      defaultChecked={productInput.status === 1 ? true : false}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button className="btn btn-primary px-4 mt-3" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Editproduct;
