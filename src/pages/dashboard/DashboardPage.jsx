// src/App.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping, faBoxOpen, faBoxesStacked, faTruck, faTruckRampBox, faRotateLeft
} from '@fortawesome/free-solid-svg-icons'
import BottomAlert from '../../components/BottomAlert'
import AnalyticsServices from '../../services/analytics.services'

const Widget = ({ numbers, title, icon }) => {
    return (
        <div className='bg-slate-200 p-4 rounded-lg '>
            <div className='flex justify-between'>
                <h1>{title}</h1>
            </div>
            <div className='flex justify-between my-4'>
                <div className='w-8 h-8 bg-slate-500 rounded-full grid'><FontAwesomeIcon className='place-self-center text-white' icon={icon} /></div>
                <p>{numbers}</p>
            </div>
            {/* <Link to='/' className='underline underline-offset-4 text-blue-400 hover:text-blue-600'>View more...</Link> */}
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
    const message = useSelector((state) => state.message.message);
    const [analytics, setAnalytics] = useState(null);

    const getAnalytics = async () => {
        const result = await AnalyticsServices.getAnalytics();
        setAnalytics(result);
    }
    useEffect(() => {
        getAnalytics()
    }, [])

    return (
        <div className='w-full '>
            {console.log(analytics)}
            {message && <BottomAlert message={message} />}
            <div className='w-full my-10 flex flex-col items-center justify-center gap-4 '>
                <div className='w-full  grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    <Widget numbers={analytics?.totalOrders} title={'Total Orders'} icon={faBoxesStacked} />
                    <Widget numbers={analytics?.totalOrderedOrders} title={'Orders'} icon={faBoxOpen} />
                    <Widget numbers={analytics?.totalProcessedOrders} title={'Processed'} icon={faCartShopping} />
                    <Widget numbers={analytics?.totalInTransitOrders} title={'In Transit'} icon={faTruck} />
                    <Widget numbers={analytics?.totalDeliveredOrders} title={'Total Delivered'} icon={faTruckRampBox} />
                    <Widget numbers={analytics?.totalCancelledOrders} title={'Cancelled'} icon={faRotateLeft} />

                </div>
                <BestSellerCard />
                <RevenueGraphCard />
                <LatestOrdersCard />
            </div>
        </div>
    );
};

export default DashboardPage;