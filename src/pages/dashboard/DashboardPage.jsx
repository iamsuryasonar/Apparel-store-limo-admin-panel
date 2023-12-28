// src/App.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping, faWallet, faUser, faPerson } from '@fortawesome/free-solid-svg-icons'

const Sidebar = ({ isSidebarOpen }) => {
    return (
        <nav className='fixed h-screen'>
            <aside className={` bg-gray-800 h-full overflow-y-auto text-white ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
                <div className="px-4 flex items-center justify-between h-16 bg-gray-700">
                    <span className="text-xl font-semibold">Logo</span>
                </div>
                <nav className="py-4">
                    <a href="#" className="flex items-center py-2 px-4 hover:bg-gray-700">
                        Home
                    </a>
                    <a href="#" className="flex items-center py-2 px-4 hover:bg-gray-700">
                        About
                    </a>
                </nav>
            </aside>
        </nav>
    );
};

const Widget = ({ title, icon }) => {
    return (
        <div className='bg-orange-300 p-4 rounded-lg '>
            <div className='flex justify-between'>
                <h1>{title}</h1>
                <p>+12%</p>
            </div>
            <div className='flex justify-between my-4'>
                <div className='w-8 h-8 bg-red-400 rounded-full grid'><FontAwesomeIcon className='place-self-center' icon={icon} /></div>
                <p>421</p>
            </div>
            <Link to='/'>View more...</Link>
        </div>
    )

}

const BestSellerCard = () => {
    return (
        <>
            <div className='w-full p-6'>
                <div className='w-full p-4 flex flex-col rounded-lg bg-orange-300 '>
                    <div className='flex justify-between'>
                        <p className='place-self-center text-2xl'>Best seller</p>
                        <p className='place-self-center text-2xl'>Sales</p>
                    </div>
                    <div className='w-full h-[1px] bg-black'></div>
                    <div className='flex justify-between py-2'>
                        <div>
                            <p>Nike Women's Race Running Shoe</p>
                            <p>Women shoes</p>
                        </div>
                        <div>
                            <p>$4,345</p>
                        </div>
                    </div>
                    <div className='flex justify-between py-2'>
                        <div>
                            <p>Nike Women's Race Running Shoe</p>
                            <p>Women shoes</p>
                        </div>
                        <div>
                            <p>$4,345</p>
                        </div>
                    </div>
                    <div className='flex justify-between py-2'>
                        <div>
                            <p>Nike Women's Race Running Shoe</p>
                            <p>Women shoes</p>
                        </div>
                        <div>
                            <p>$4,345</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
const RevenueGraphCard = () => {
    return (
        <div className='w-full p-6'>
            <div className='w-full p-4 flex flex-col rounded-lg bg-orange-300'>
                <p className='text-2xl'>Revenue</p>
                <p>Today's Earning: <span>$1,570.30</span></p>
                <div className='bg-black h-[1px]'></div>
                <div className='flex justify-center items-center'>
                    {/* graph here */}
                </div>
            </div>
        </div>
    )
}
const LatestOrdersCard = () => {
    return (
        <div className='w-full p-6'>
            <div className='w-full p-4 flex flex-col rounded-lg bg-orange-300'>
                <p className='text-2xl'>Latest Orders</p>
                <div className='bg-black h-[1px]'></div>
                <div className='flex justify-center items-center'>
                    {/* data table here */}
                </div>
            </div>
        </div>
    )
}

const DashboardPage = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <div className="flex h-screen w-screen bg-gray-100">
                <Sidebar isSidebarOpen={isSidebarOpen} />
                <div className={`w-full flex flex-col items-start ${isSidebarOpen ? 'ms-64' : 'ms-20'} transition-all duration-300 ease-in-out`}>
                    <div className="w-full h-16 flex justify-between items-center p-4 bg-slate-200">
                        <button className="p-2 focus:outline-none" onClick={toggleSidebar}>
                            <FontAwesomeIcon className='text-xl' icon={faBars} />
                        </button>
                        <h1 className='text-2xl'>Dashboard</h1>
                        <div></div>
                    </div>
                    <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-6 gap-6'>
                        <Widget title={'Total Orders'} icon={faCartShopping} />
                        <Widget title={'Total Sales'} icon={faWallet} />
                        <Widget title={'New Customer'} icon={faUser} />
                        <Widget title={'Users Online'} icon={faPerson} />
                    </div>
                    <BestSellerCard />
                    <RevenueGraphCard />
                    <LatestOrdersCard />
                </div>
            </div >
        </>
    );
};

export default DashboardPage;