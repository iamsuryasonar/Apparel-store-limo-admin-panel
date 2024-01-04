// src/App.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping, faWallet, faUser, faPerson } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'




const Widget = ({ title, icon }) => {
    return (
        <div className='bg-slate-200 p-4 rounded-lg '>
            <div className='flex justify-between'>
                <h1>{title}</h1>
                <p>+12%</p>
            </div>
            <div className='flex justify-between my-4'>
                <div className='w-8 h-8 bg-slate-500 rounded-full grid'><FontAwesomeIcon className='place-self-center text-white' icon={icon} /></div>
                <p>421</p>
            </div>
            <Link to='/' className='underline underline-offset-4 text-blue-400 hover:text-blue-600'>View more...</Link>
        </div>
    )

}

const BestSellerCard = () => {
    return (
        <>
            <div className='w-full '>
                <div className='w-full p-4 flex flex-col rounded-lg bg-slate-200 '>
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
        <div className='w-full '>
            <div className='w-full p-4 flex flex-col rounded-lg bg-slate-200'>
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
        <div className='w-full'>
            <div className='w-full p-4 flex flex-col rounded-lg bg-slate-200'>
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
    const loading = useSelector((state) => state.loading.value);

    return (
        <div className='w-full p-6 grid place-content-center '>
            {loading ? (
                <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center  bg-opacity-90 z-50">
                    <div className="animate-spin border-t-8 border-blue-500 border-solid rounded-full w-16 h-16"></div>
                </div>
            ) :
                <div className='w-full  max-w-4xl my-10 flex flex-col items-center justify-center gap-4 '>
                    <div className='w-full  grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        <Widget title={'Total Orders'} icon={faCartShopping} />
                        <Widget title={'Total Sales'} icon={faWallet} />
                        <Widget title={'New Customer'} icon={faUser} />
                        <Widget title={'Users Online'} icon={faPerson} />
                    </div>
                    <BestSellerCard />
                    <RevenueGraphCard />
                    <LatestOrdersCard />
                </div>
            }
        </div>
    );
};

export default DashboardPage;