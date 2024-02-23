import { useMemo } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { LOCAL_STORAGE_NAME } from '../../common/constants'

const PublicRoute = ({ userData }) => {
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