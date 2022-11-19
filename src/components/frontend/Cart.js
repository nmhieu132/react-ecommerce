import React, { useEffect, useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { BsTrash } from 'react-icons/bs'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Cart() {
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [cart, setCart] = useState([])
    if (!localStorage.getItem('auth_token')) {
        history.push('/')
        swal('Warning', 'You are not logged in', 'error')
    }
    var totalBill = 0;
    var totalQutt = 0;
    useEffect(() => {
        let isMounted = true;

        axios.get(`/api/cart`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setCart(res.data.cart);
                    setLoading(false)
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
    }, [history, cart])
    const handleDecrease = (cart_id) => {
        setCart(cart =>
            cart.map((item) =>
                cart_id === item.id ? { ...item, product_quantity: item.product_quantity - (item.product_quantity > 1 ? 1 : 0) } : item
            )
        );
        updateQuantity(cart_id, 'decrease')
    }
    const handleIncrease = (cart_id) => {
        setCart(cart =>
            cart.map((item) =>
                cart_id === item.id ? { ...item, product_quantity: item.product_quantity + (item.product_quantity < 10 ? 1 : 0) } : item
            )
        )
        updateQuantity(cart_id, 'increase')
    }
    function updateQuantity(cart_id, scope) {
        axios.put(`/api/cart-updatequantity/${cart_id}/${scope}`).then(res => {
            if (res.data.status === 200) {
            }
        })
    }
    const removeItem = (e, cart_id) => {
        e.preventDefault()
        const clickTarget = e.currentTarget
        clickTarget.innerText = 'Removing'
        axios.delete(`/api/cart-removeitem/${cart_id}`).then(res => {
            if (res.data.status === 200) {
                swal('Success', res.data.message, 'Removed!')
                console.log(res.data)
            }
            else if (res.data.status === 404) {
                swal('Error', res.data.message, 'error!')
                clickTarget.innerText = 'Remove'
            }
        })
    }
    if (loading) {
        return <Box sx={{ display: 'flex', width: '100%', marginTop: '300px', alignItems: 'center', justifyContent: 'center', color: 'black' }}>
            <CircularProgress sx={{ width: ' 100px', color: 'inherit' }} />
        </Box>
    }
    var cartDisplay = ''
    if (cart.length > 0) {
        cartDisplay =

            <div className='col-md-8'>

                {cart.map((item, idx) => {
                    totalBill += item.product?.selling_price * item.product_quantity
                    totalQutt += item.product_quantity
                    return (
                        <>
                            <div className='d-flex justify-content-between' key={idx}>
                                <div className='product-info d-flex'>

                                    <div className='product-image'>
                                        <img src={`http://localhost:8000/${item.product?.image}`} alt="Product Image" width='220px' height='220px' />

                                    </div>
                                    <div className='product-detail d-flex flex-column ms-4'>

                                        <p className='product-title'>{item.product.name}</p>
                                        <p className='product-descr'>{item.product.descr}</p>
                                        <p className='product-brand'>{item.product.brand}</p>
                                        <div className='product-ordered_qtt d-flex mb-3'>
                                            <div>
                                                <AiOutlineMinus size={20} onClick={() => handleDecrease(item.id)} className="icon-quantity" />
                                            </div>
                                            <div className='font-lg mx-3 '>
                                                {item.product_quantity}
                                            </div>
                                            <div>
                                                <AiOutlinePlus size={20} onClick={() => handleIncrease(item.id)} className="icon-quantity" />
                                            </div>
                                        </div>
                                        <BsTrash size={20} className="delete-icon" onClick={(e) => removeItem(e, item.id)} />
                                    </div>
                                </div>

                                <div className='product-selling_price mt-1'>
                                    {item.product.selling_price}$
                                </div>
                            </div>
                            <hr className='my-5' />

                        </>

                    )
                })}
            </div>

    }
    else {
        cartDisplay = <div className='table-responsive'>
            <div className='card card-body py-5 text-center shadow-sm'>
                <h4>You have not bought anything</h4>
            </div>
        </div>
    }
    return (
        <div>
            <div className='pt-3 pb-1 bg-black text-white'>
                <div className='container'>
                    <h5>Cart</h5>
                </div>
            </div>
            <div className='container py-5'>
                <div className='row'>
                    {cartDisplay}
                    <div className='col-md-4 d-flex flex-column px-3'>
                        <div className='summary'>
                            Summary
                        </div>
                        <div className='subtotal mt-4'>
                            <p>Subtotal:</p>
                            <p>{totalBill}$</p>
                        </div>
                        <div className='subtotal'>
                            <p>Estimated Delivery & Handling</p>
                            <p>15$</p>
                        </div>
                        <hr />
                        <div className='subtotal'>
                            <p>Total:</p>
                            <p>{`${totalBill + 15}`}$</p>
                        </div>
                        <Link to="/checkout">
                            <button type="button" className='checkout-btn'>Checkout</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart