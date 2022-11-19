import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
function Viewproduct() {
  const [product, setProduct] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let isMounted = true;
    document.title = "Product";
    axios.get(`/api/view-product`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setProduct(res.data.products);
          setLoading(false);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);
  var show_product = "";
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
  } else {
    var prodStatus = "";
    show_product = product.map((item, index) => {
      if (item.status == "0") {
        prodStatus = "Shown";
      } else if (item.status == "1") {
        prodStatus = "Hidden";
      }
      return (
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.category?.name}</td>
          <td>{item.name}</td>
          <td>{item.selling_price}</td>
          <td width={"40%"}>
            <img
              src={`http://localhost:8000/${item.image}`}
              className="adm-product-img"
              alt={item.name}
            />
          </td>
          <td>
            <Link
              to={`edit-product/${item.id}`}
              className="btn btn-success btn-sm"
            >
              Edit
            </Link>
          </td>
          <td>{prodStatus}</td>
        </tr>
      );
    });
  }
  return (
    <div className="card px-5 mt-4">
      <div className="card-header">
        <h4>
          View Product
          <Link
            to="/admin/add-product"
            className="btn btn-primary btn-success btn-sm float-end"
          >
            Add Product
          </Link>
        </h4>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table  ">
            <thead>
              <tr>
                <th>Id</th>
                <th>Category</th>
                <th>Product</th>
                <th>Selling Price</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{show_product}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Viewproduct;
