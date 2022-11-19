import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import swal from "sweetalert";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
function ViewProduct(props) {
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState([])
    const [categor, setCategor] = useState([])
    const proCount = product.length
    useEffect(() => {
        let isMounted = true;
        const product_slug = props.match.params.slug
        axios.get(`/api/fetchproduct/${product_slug}`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setProduct(res.data.product_data.product);
                    setCategor(res.data.product_data.category);
                    setLoading(false)
                }
                else if (res.data.status === 400) {
                    swal('Warning', res.data.message,)
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
    }, [props.match.params.slug, history])
    if (loading) {
        return <Box sx={{ display: 'flex', width: '100%', marginTop: '300px', alignItems: 'center', justifyContent: 'center', color: 'black' }}>
            <CircularProgress sx={{ width: ' 100px', color: 'inherit' }} />
        </Box>
    }
    else {
        var showProduct = ''
        if (proCount) {
            showProduct = product.map((item, idx) => {
                return (
                    <div className='col-md-4 mb-5' key={idx}>
                        <div className='card'>
                            <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                                <img src={`http://localhost:8000/${item.image}`} className='w-100' alt={item.name} />
                            </Link>
                            <div className='card-body'>
                                <Link className='product-name' to={`/collections/${item.category.slug}/${item.slug}`}>
                                    <h4>{item.name}</h4>
                                </Link>
                                <div>
                                    {item.descr}
                                </div>
                                <div>
                                    {item.selling_price}$
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        else {
            showProduct =
                <div className='col-md-12'>
                    <h4>Category {categor.name} has no product</h4>
                </div>
        }
    }
    return (
        <div>
            <div className='pt-3 pb-1 bg-black text-white'>
                <div className='container'>
                    <h5>{categor.name}</h5>
                </div>
            </div>
            <div className='py-3'>
                <div className='container'>
                    <div className='row'>
                        {showProduct}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProduct