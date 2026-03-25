import React, { use } from 'react'
import { Navigate} from 'react-router-dom';

function ProtectedRouteUser({children}) {
    const user = localStorage.getItem('user');
    if (!user) {
    return <Navigate to="/logIn" replace />;
  }
    return children
  
}

export default ProtectedRouteUser
