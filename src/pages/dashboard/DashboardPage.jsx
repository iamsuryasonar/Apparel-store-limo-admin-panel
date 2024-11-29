import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
    faCartShopping, faBoxOpen, faBoxesStacked, faTruck, faTruckRampBox, faRotateLeft
} from '@fortawesome/free-solid-svg-icons'
import BottomAlert from '../../components/BottomAlert'
import Widget from './components/Widget';
import LatestOrders from './components/LatestOrders';
import MostOrderedProducts from './components/MostOrderedProducts';
import { formatIndianNumber } from '../../common/utilities';
import { get_analytics } from '../../store/slices/analyticsSlice';

const DashboardPage = () => {
    const dispatch = useDispatch();
    const message = useSelector((state) => state.message.message);

    const analyticsData = useSelector((state) => state.analytics.analytics);

    useEffect(() => {
        dispatch(get_analytics());
    }, [])

    return (
        <div className='w-full'>
            {message && <BottomAlert message={message} />}
            {
                analyticsData &&
                <div className='w-full my-10 flex flex-col items-center justify-center gap-4 '>
                    <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                        <Widget numbers={analyticsData?.totalOrders} title={'Total Orders'} icon={faBoxesStacked} />
                        <Widget numbers={analyticsData?.totalOrderedOrders} title={'Orders'} icon={faBoxOpen} />
                        <Widget numbers={analyticsData?.totalProcessedOrders} title={'Processed'} icon={faCartShopping} />
                        <Widget numbers={analyticsData?.totalInTransitOrders} title={'In Transit'} icon={faTruck} />
                        <Widget numbers={analyticsData?.totalDeliveredOrders} title={'Total Delivered'} icon={faTruckRampBox} />
                        <Widget numbers={analyticsData?.totalCancelledOrders} title={'Cancelled'} icon={faRotateLeft} />
                        <Widget numbers={`₹${formatIndianNumber(analyticsData.totalRevenue)}`} title={'Total Revenue'} icon={faRotateLeft} />
                    </div>
                    <LatestOrders latestOrders={analyticsData?.latestOrders} />
                    <MostOrderedProducts latestOrders={analyticsData?.latestOrders} />
                </div>
            }
        </div>
    );
};

export default DashboardPage;