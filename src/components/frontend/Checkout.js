import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios'
import swal from 'sweetalert'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Checkout() {
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [cart, setCart] = useState([])
    const [error, setError] = useState([])
    if (!localStorage.getItem('auth_token')) {
        history.push('/')
        swal('Warning', 'You are not logged in', 'error')
    }
    var totalBill = 0;
    const [checkoutInput, setCheckoutInput] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        country: '',
        zipcode: '',
    })
    useEffect(() => {
        let isMounted = true;

        axios.get(`/api/cart`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setCart(res.data.cart);
                    setLoading(false)
                    console.log(res.data.cart)
                }
                else if (res.data.status === 401) {
                    history.push('/')
                    swal('Warning', res.data.message, 'error')
                }
            }
        })
        return () => {
            isMounted = false;
        }
    }, [history])
    const handleInput = (e) => {
        e.persist()
        setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value })
    }
    const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
    const paypal_data = {
        firstname: checkoutInput.firstname,
        lastname: checkoutInput.lastname,
        phone: checkoutInput.phone,
        email: checkoutInput.email,
        address: checkoutInput.address,
        city: checkoutInput.city,
        country: checkoutInput.country,
        zipcode: checkoutInput.zipcode,
        payment_id: '',
        payment_mode: 'paypal',

    }

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: 0.1,
                    },
                },
            ],
        });
    };
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {

            paypal_data.payment_id = details.id
            axios.post(`/api/placeorder`, paypal_data).then(res => {
                if (res.data.status === 200) {
                    swal('Order Successfully', res.data.message, 'success')
                    setError([])
                    history.push('/')
                    console.log(details)
                }
                else if (res.data.status === 422) {
                    swal('All fields are required', '', 'error')
                    setError(res.data.errors)
                }

            })
        }
        )
    };
    const submitOrder = (e, payment_mode) => {
        e.preventDefault()
        const data = {
            firstname: checkoutInput.firstname,
            lastname: checkoutInput.lastname,
            phone: checkoutInput.phone,
            email: checkoutInput.email,
            address: checkoutInput.address,
            city: checkoutInput.city,
            country: checkoutInput.country,
            zipcode: checkoutInput.zipcode,
            payment_mode: payment_mode
        }

        switch (payment_mode) {
            case 'cod':
                axios.post(`/api/placeorder`, data).then(res => {
                    if (res.data.status === 200) {
                        swal('Order Successfully', res.data.message, 'success')
                        setError([])
                        history.push('/')
                    }
                    else if (res.data.status === 422) {
                        swal('All fields are required', '', 'error')
                        setError(res.data.errors)
                    }

                })
                break;
            case 'paypal':
                var paypalModal = new window.bootstrap.Modal(document.getElementById('paypalModal'))
                axios.post(`/api/validate-order`, data).then(res => {
                    if (res.data.status === 200) {
                        setError([])
                        paypalModal.show()
                    }
                    else if (res.data.status === 422) {
                        swal('All fields are required', '', 'error')
                        setError(res.data.errors)
                    }
                })
                break;

            default:
                break;
        }
    }
    if (loading) {
        return <Box sx={{ display: 'flex', width: '100%', marginTop: '300px', alignItems: 'center', justifyContent: 'center', color: 'black' }}>
            <CircularProgress sx={{ width: ' 100px', color: 'inherit' }} />
        </Box>
    }
    return (
        <div>
            <div className="modal fade" id="paypalModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Paypal</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <hr />
                            <PayPalButton
                                createOrder={(data, actions) => createOrder(data, actions)}
                                onApprove={(data, actions) => onApprove(data, actions)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='py-3 bg-black text-white'>
                <div className='container'>
                    <h5>Checkout</h5>
                </div>
            </div>
            <div className='py-4'>
                <div className='container'>
                    <div class="row">
                        <div class="col-md-4 order-md-2 mb-4">
                            <h4 class="d-flex justify-content-between align-items-center mb-3">
                                <span class="text-black">Your cart</span>
                                <span class="badge badge-secondary badge-pill text-black">{cart.product_quantity}</span>
                            </h4>
                            <ul class="list-group mb-3 sticky-top">
                                {cart.map((item, idx) => {
                                    totalBill += item.product.selling_price * item.product_quantity
                                    return (
                                        <li class="list-group-item d-flex justify-content-between lh-condensed">
                                            <div>
                                                <h6 class="my-0">{item.product.name}</h6>
                                                <small class="text-muted">Quantity: {item.product_quantity}</small>
                                            </div>
                                            <div class="d-flex flex-column justify-content-end">
                                                <h6 class="my-0 pl-5">{item.product.selling_price * item.product_quantity}</h6>
                                                <small class="text-muted">Selling price: {item.product.selling_price}</small>
                                            </div>
                                        </li>
                                    )
                                }
                                )
                                }
                                <li class="list-group-item d-flex justify-content-between">
                                    <span>Total (USD)</span>
                                    <strong>{totalBill}</strong>
                                </li>
                            </ul>

                        </div>
                        <div class="col-md-8 order-md-1">
                            <h4 class="mb-3">Billing address</h4>
                            <form class="needs-validation" novalidate="" />
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label>First Name</label>
                                    <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.fistname} className='form-control' />
                                    <span className='text-danger'>{error.firstname}</span>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label>Last Name</label>
                                    <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} className='form-control' />
                                    <span className='text-danger'>{error.lastname}</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label>Phone Contact</label>
                                    <input type="text" name="phone" onChange={handleInput} value={checkoutInput.phone} className='form-control' />
                                    <span className='text-danger'>{error.phone}</span>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label>Email Address</label>
                                    <input type="text" name="email" onChange={handleInput} value={checkoutInput.email} className='form-control' />
                                    <span className='text-danger'>{error.email}</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 mb-3">
                                    <label>Address</label>
                                    <input type="text" name="address" onChange={handleInput} value={checkoutInput.address} className='form-control' />
                                    <span className='text-danger'>{error.address}</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 mb-3">
                                    <label>City</label>
                                    <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} className='form-control' />
                                    <span className='text-danger'>{error.city}</span>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label>Country</label>
                                    <input type="text" name="country" onChange={handleInput} value={checkoutInput.country} className='form-control' />
                                    <span className='text-danger'>{error.country}</span>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label>Zip Code</label>
                                    <input type="text" name="zipcode" onChange={handleInput} value={checkoutInput.zipcode} className='form-control' />
                                    <span className='text-danger'>{error.zipcode}</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-2 mb-3">
                                    <button type="button" className='btn bg-black text-white mx-1' onClick={(e) => submitOrder(e, 'cod')}>Place Order</button>
                                </div>
                                <div class="col-md-2 mb-3">
                                    <button type="button" className='btn btn-warning mx-1' onClick={(e) => submitOrder(e, 'paypal')}>Pay Online</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Checkout