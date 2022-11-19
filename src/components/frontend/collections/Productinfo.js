import React, { useEffect, useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
function Productinfo(props) {
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState([])
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        let isMounted = true;
        const product_slug = props.match.params.product
        const category_slug = props.match.params.category
        axios.get(`/api/view-productinfo/${category_slug}/${product_slug}`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setProduct(res.data.product);
                    setLoading(false)
                }
                else if (res.data.status === 404) {
                    history.push('/collections')
                    swal('Warning', res.data.message, 'error')
                }
            }
        })
        return () => {
            isMounted = false;
        }
    }, [props.match.params.category, props.match.params.product, history])
    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(prevCount => prevCount - 1)
        }
    }
    const handleIncrease = () => {
        if (quantity < 10) {
            setQuantity(prevCount => prevCount + 1)
        }
    }
    const submitAddToCart = (e) => {
        e.preventDefault()
        const data = {
            product_id: product.id,
            product_quantity: quantity,
        }
        console.log(data.product_id)
        axios.post(`/api/add-to-cart`, data).then(res => {
            if (res.data.status === 201) {
                swal('Success', res.data.message, 'success')
            }
            else if (res.data.status === 409) {
                swal('Warning', res.data.message, 'warning')
            }
            else if (res.data.status === 401) {
                swal('Error', res.data.message, 'error')
            }
            else if (res.data.status === 404) {
                swal('Warning', res.data.message, 'warning')
            }
        })
    }
    if (loading) {
        return <Box sx={{ display: 'flex', width: '100%', marginTop: '300px', alignItems: 'center', justifyContent: 'center', color: 'black' }}>
            <CircularProgress sx={{ width: ' 100px', color: 'inherit' }} />
        </Box>
    }
    else {
        var instock = ''
        if (product.quantity > 0) {
            instock =
                <div>
                    <div className='product-ordered_qtt d-flex mb-3'>
                        <div>
                            <AiOutlineMinus size={25} onClick={handleDecrease} className="icon-quantity" />
                        </div>
                        <div className='fs-5 mx-3 '>
                            {quantity}
                        </div>
                        <div>
                            <AiOutlinePlus size={25} onClick={handleIncrease} className="icon-quantity" />
                        </div>
                    </div>
                </div>
        }
        else {
            instock = <div>
                <label className='btn-sm bg-black text-white px-4 mt-2'>Out stock</label>
            </div>
        }
    }
    return (
        <div>
            <div className='py-3 bg-black text-white'>
                <div className='container'>
                    <h5>{product.category.name}</h5>
                </div>
            </div>
            <div className='py-3'>
                <div className='container'>
                    <div className='row '>
                        <div className='col-md-7 product-info_image w-50'>
                            <img src={`http://localhost:8000/${product.image}`} alt="" />
                            <span className='custom-line'></span>
                        </div>
                        <div className='col-md-5 product-info_detail'>
                            <div className='product-name'>
                                {product.name}
                            </div>
                            <div className='product-descr'>
                                {product.descr}
                            </div>
                            <div className='product-selling_price'>
                                {product.selling_price}$
                            </div>

                            {instock}
                            <button type="button" onClick={submitAddToCart} className='btn-add_Cart'>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Productinfo