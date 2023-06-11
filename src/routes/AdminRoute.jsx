import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext);
    const location=useLocation();
    const [isAdmin,isAdminLoading]=useAdmin();
    if(loading || isAdminLoading){
        return <progress className="progress w-56"></progress>
    }
    if(user && isAdmin){
        return children;
    }
    return <Navigate to="/" state={{from:location}} replace></Navigate>
};

export default AdminRoute;