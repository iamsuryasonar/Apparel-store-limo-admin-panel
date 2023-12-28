import Nav from './Nav';
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

function NavAndOutlet() {
    return <div className=''>
        {/* <Nav /> */}
        <div className='flex justify-center'>
            <Outlet />
        </div>
        {/* <Footer /> */}
    </div>
}
export default NavAndOutlet;