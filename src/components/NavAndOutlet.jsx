import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping, faWallet, faUser, faPerson } from '@fortawesome/free-solid-svg-icons'



function NavAndOutlet() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [currentRoute, setCurrentRoute] = useState('');

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="w-screen h-full flex">
            <Sidebar isSidebarOpen={isSidebarOpen} setCurrentRoute={setCurrentRoute} />
            <div className={`w-full ${isSidebarOpen ? 'ms-64' : 'ms-20'}  transition-all duration-300 ease-in-out`}>
                <div className={`h-16 p-4 z-10 fixed top-0 ${isSidebarOpen ? 'left-64' : 'left-20'} right-0 flex justify-between items-center  bg-gray-400 transition-all duration-300 ease-in-out `}>
                    <button className="p-2 focus:outline-none" onClick={toggleSidebar}>
                        <FontAwesomeIcon className='text-xl' icon={faBars} />
                    </button>
                    <h1 className='text-2xl uppercase'>{currentRoute.replace(/[-/]+/g, " ")}</h1>
                    <div></div>
                </div>
                <div className='w-full h-16'></div>
                <div className='flex justify-center items-center'>
                    <div className='max-w-4xl w-full p-6'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NavAndOutlet;