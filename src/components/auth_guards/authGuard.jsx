import { Navigate } from 'react-router-dom';
import { LOCAL_STORAGE_NAME } from '../../common/constants'

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem(LOCAL_STORAGE_NAME)
    return token ? <Navigate to="/dashboard" /> : <>{children}</>;
};

export default PublicRoute;