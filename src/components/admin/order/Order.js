import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import swal from 'sweetalert';
function Order() {
    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let isMounted = true;
        axios.get(`/api/admin/orders`).then((res) => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setOrders(res.data.orders);
                    setLoading(false);

                }
            }
        });
        return () => {
            isMounted = false;
        };

    }, []);


    const removeOrder = (e, id) => {
        e.preventDefault()
        const clickTarget = e.currentTarget
        clickTarget.innerText = 'Removing'
        axios.delete(`/api/order-remove/${id}`).then(res => {
            if (res.data.status === 200) {
                swal('Success', res.data.message, 'Removed!')
                clickTarget.closest('tr').remove()
            }
            else if (res.data.status === 404) {
                swal('Error', res.data.message, 'error!')
                clickTarget.innerText = 'Remove'
            }
        })
    }

    var show_orders = ''
    if (loading) {
        return <Box sx={{ display: 'flex', width: '100%', marginTop: '300px', alignItems: 'center', justifyContent: 'center', color: 'black' }}>
            <CircularProgress sx={{ width: ' 100px', color: 'inherit' }} />
        </Box>
    }
    else {
        show_orders = orders?.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.tracking_no}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                    <td>{item.email}</td>
                    <td>
                        <Link
                            to={`view-order/${item.id}`}
                            className="btn btn-success btn-sm"
                        >
                            View
                        </Link>
                        <button
                            type="button"
                            onClick={(e) => removeOrder(e, item.id)}
                            className="btn btn-danger ms-2 btn-sm"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            );
        });
    }
    return (
        <div className="card px-5 mt-4">
            <div className="card-header">
                <h4>
                    Orders
                    <Link
                        to="/admin/add-product"
                        className="btn btn-primary btn-success btn-sm float-end"
                    ></Link>
                </h4>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Tracking Number</th>
                                <th>Phone Contact</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>{show_orders}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Order