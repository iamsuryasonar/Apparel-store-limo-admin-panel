import { Navigate } from 'react-router-dom';
import { LOCAL_STORAGE_NAME } from '../../common/constants'

function PrivateRoute({ children }) {
    const token = localStorage.getItem(LOCAL_STORAGE_NAME)
    return token ? <>{children}</> : <Navigate to="/" />;
}

export default PrivateRoute;