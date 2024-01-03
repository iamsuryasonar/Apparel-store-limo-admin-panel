import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faImage, faHouse } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Sidebar = ({ isSidebarOpen }) => {

    return (
        <nav className='fixed h-full'>
            <aside className={` bg-gray-800 h-full overflow-y-auto text-white ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out `}>
                <div className="px-4 flex items-center justify-between h-16 bg-gray-700">
                    <span className="text-xl font-semibold">Logo</span>
                </div>
                <nav className="py-4">
                    {isSidebarOpen ?
                        <>
                            <Link to="/dashboard" className=" w-full p-4 mb-1 flex items-center bg-gray-600 hover:bg-gray-700">
                                Dashboard
                            </Link>
                            <Link to="/product" className="w-full p-4 mb-1 flex items-center bg-gray-600 hover:bg-gray-700">
                                Product
                            </Link>
                            <Link to="/add-product" className="w-full p-4 mb-1 flex items-center bg-gray-600 hover:bg-gray-700">
                                Add Product
                            </Link></>
                        :
                        <>
                            <Link to="/dashboard">
                                <FontAwesomeIcon className='w-full py-4  bg-gray-600 hover:bg-gray-700' icon={faHouse} />
                            </Link>
                            <Link to="/product">
                                <FontAwesomeIcon to="/product" className='w-full py-4  bg-gray-600 hover:bg-gray-700' icon={faImage} />
                            </Link>
                            <Link to="/add-product">
                                <FontAwesomeIcon className='w-full py-4 bg-gray-600 hover:bg-gray-700' icon={faPlus} />
                            </Link>
                        </>
                    }
                </nav>
            </aside>
        </nav>
    );
};

export default Sidebar;