import React from 'react'
import {jwtDecode} from 'jwt-decode';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({role}) => {
    let token=localStorage.getItem('token');
    if(!token){
        return <Navigate to='/login' />
    }

    const decodedToken = jwtDecode(token);
    //console.log(decodedToken);

  return (
    role==decodedToken.role?<Outlet/>:<Navigate to='/login' />
)
}

export default PrivateRoutes
