import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Viewcategor() {
  const [loading, setLoading] = useState(true);
  const [categorylist, setCategorylist] = useState([]);

  useEffect(() => {
    axios.get(`/api/view-category`).then((res) => {
      console.log(res.data.category);
      if (res.status === 200) {
        setCategorylist(res.data.category);
      }
      setLoading(false);
    });
  }, []);

  var viewcategory_table = "";
  const removeCategory = (e, id) => {
    e.preventDefault();
    const btnClicked = e.currentTarget;
    btnClicked.innerText = "Deleting";
    axios.delete(`/api/remove-category/${id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "Remove Category successfully");
        btnClicked.closest("tr").remove();
      } else if (res.data.status === 404) {
        swal("Success", res.data.message, "success");
        btnClicked.innerText = "Delete";
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
  } else {
    viewcategory_table = categorylist.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.slug}</td>
          <td>{item.status}</td>
          <td>
            <Link
              to={`edit-category/${item.id}`}
              className="btn btn-success btn-sm"
            >
              Edit
            </Link>
          </td>
          <td>
            <button
              type="button"
              onClick={(e) => removeCategory(e, item.id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }
  return (
    <div className="container px-5">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            {" "}
            List of categories
            <Link
              to="/admin/add-categor"
              className="btn btn-primary btn-sm float-end "
            >
              Add Category
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>{viewcategory_table}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Viewcategor;
