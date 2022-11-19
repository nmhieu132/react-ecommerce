import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Route, Redirect } from 'react-router-dom'
import swal from 'sweetalert'
import MainContent from './layout/admin/MainContent'

function AdminRoute({ ...rest }) {
    const history = useHistory();
    const [checkAuthen, setCheckAuthen] = useState(false)
    const [homeRedirect, setHomeRedirect] = useState(true)
    useEffect(() => {
        axios.get(`/api/checkingAuthenticated`).then(res => {
            if (res.status === 200) {
                setCheckAuthen(true)
            }
            setHomeRedirect(false)
        })
        return () => {
            setCheckAuthen(false)
        }

    }, []);
    // axios.interceptors.response.use(undefined,function axiosRetryInterceptor(err){
    //     if(err.response.status===401){
    //         swal('Error 401',err.response.data.message,"warning");
    //         history.push('/');
    //     }
    //     return Promise.reject(err);
    // })
    axios.interceptors.response.use(function (response) {
        return response;
    },
        function (error) {
            if (error.response.status === 403) {
                swal('Access Forbidden', error.response.data.message, 'warning');
                history.push('/403');
            }
            else if (error.response.status === 404) {
                swal('Page not found', '404 error', 'warning');
                history.push('/404');
            }
            return Promise.reject(error);
        }
    )
    if (homeRedirect) {
        return <h1>Home Redirecting...</h1>
    }
    return (

        <Route {...rest}
            render={({ props, location }) =>
                checkAuthen ?
                    (<MainContent {...props} />) :
                    (<Redirect to={{ pathname: '/login', state: { from: location } }} />)
            }
        />
    )
}

export default AdminRoute