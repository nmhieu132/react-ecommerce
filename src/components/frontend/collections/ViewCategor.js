import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
function ViewCategor() {
  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let isMounted = true
    axios.get(`/api/getCategory`).then(res => {
      if (isMounted) {
        if (res.data.status === 200) {
          setCategory(res.data.category)
          setLoading(false)
        }
      }
    })
    return () => {
      isMounted = false
    }
  }, [])
  if (loading) {
    return <Box sx={{ display: 'flex', width: '100%', marginTop: '300px', alignItems: 'center', justifyContent: 'center', color: 'black' }}>
      <CircularProgress sx={{ width: ' 100px', color: 'inherit' }} />
    </Box>
  }
  else {
    var showCategory = ''
    showCategory = category.map((item) => {
      return (
        <div className='col-md-4' key={item.id}>
          <div className='card'>

            <div className='card-body '>
              <Link className='category-name text-black' to={`collections/${item.name}`}>
                <h5>{item.name}</h5>
              </Link>
              <div>
                {item.description}
              </div>
            </div>
          </div >
        </div>
      )
    })
  }
  return (
    <div>
      <div className='py-3 bg-black text-white'>
        <div className='container'>
          <h5>Category page</h5>
        </div>
      </div>
      <div className='py-3'>
        <div className='container'>
          <div className='row'>
            {showCategory}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewCategor