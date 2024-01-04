import { Navigate } from 'react-router-dom';
import { LOCAL_STORAGE_NAME } from '../../common/constants'
import { useDispatch } from 'react-redux';
import { initialiseUser } from '../../store/slices/authSlice';
import { useEffect, useState, useMemo } from 'react'
import { Outlet } from 'react-router-dom';
const PublicRoute = ({ userData, children }) => {
    const dispatch = useDispatch()
    const accessToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME))?.accessToken;

    const isAuthenticated = useMemo(() => {
        return (userData, accessToken) => {
            return userData && accessToken;
        };
    }, []);

    return isAuthenticated(userData, accessToken) ? (
        <Navigate to="/dashboard" />
    ) : (
        <Outlet />
    )

}

export default PublicRoute;