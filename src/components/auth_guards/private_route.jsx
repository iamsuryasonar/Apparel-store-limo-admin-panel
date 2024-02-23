import { useEffect, useState, useMemo } from 'react'
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { initialiseUser } from '../../store/slices/authSlice';
import { LOCAL_STORAGE_NAME } from '../../common/constants'

const PrivateRoute = ({ userData }) => {
    const location = useLocation();
    const dispatch = useDispatch()
    const accessToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME))?.accessToken;

    const isAuthenticated = useMemo(() => {
        return (userData, accessToken) => {
            return userData && accessToken;
        };
    }, []);

    useEffect(() => {
        if (!isAuthenticated(userData, accessToken)) {
            dispatch(initialiseUser());
        }
    }, [dispatch, userData, accessToken, isAuthenticated]);

    return isAuthenticated(userData, accessToken) ? (
        <Outlet />
    ) : (
        <Navigate to="/" />
    )

}

export default PrivateRoute;