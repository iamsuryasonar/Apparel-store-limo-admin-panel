import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'


function NavAndOutlet() {

    return (
        <div className="w-screen h-full flex">
            <div className={`w-full ms-20 transition-all duration-300 ease-in-out`}>
                <Navbar />
                <div className='w-full h-16'></div>
                <div className='w-full flex justify-center items-center'>
                    <div className='w-full'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NavAndOutlet;