import { Navigate } from 'react-router-dom';
import { LOCAL_STORAGE_NAME } from '../../common/constants'
import { initialiseUser } from '../../store/slices/authSlice';
import { useEffect, useState, useMemo } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

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