import { useState } from 'react'
import { useSelector } from 'react-redux';
import AllOrdersComponent from './components/AllOrdersComponent'
import OrderedItemsComponent from './components/OrderedItemsComponent'
import ProcessedOrdersComponent from './components/ProcessedOrdersComponent'
import CancelledOrdersComponent from './components/CancelledOrdersComponent'
import TransitOrdersComponent from './components/TransitOrdersComponent'
import DeliveredOrdersComponent from './components/DeliveredOrdersComponent'
import SearchOrdersComponent from './components/SearchOrdersComponent'
import BottomAlert from '../../components/BottomAlert'

function OrdersPage() {
    const [currentPage, setCurrentPage] = useState('ALL_ORDERS')
    const message = useSelector((state) => state.message.message);

    const pages = [
        {
            id: 'ALL_ORDERS',
            name: 'ALL ORDERS',
        },
        {
            id: 'ORDERED',
            name: 'ORDERED',
        }, {
            id: 'PROCCESSED',
            name: 'PROCCESSED',
        },
        {
            id: 'CANCELLED',
            name: 'CANCELLED',
        },
        {
            id: 'TRANSIT',
            name: 'TRANSIT',
        },
        {
            id: 'DELIVERED',
            name: 'DELIVERED',
        },
        {
            id: 'SEARCH',
            name: 'SEARCH',
        }
    ]

    return (
        <div className='relative w-full h-full flex flex-col gap-4'>
            {message && <BottomAlert message={message} />}
            <div className='flex flex-col md:flex-row justify-end gap-2'>
                {
                    pages.map((item) => {
                        return <button key={item.id} onClick={
                            () => {
                                setCurrentPage(item.id)
                            }
                        } className={`bg-slate-300 text-black p-2 rounded-md ${currentPage === item.id ? 'bg-slate-600 text-white' : ''} hover:bg-slate-600 hover:text-white `}>{item.name}</button>
                    })
                }
            </div>
            {
                currentPage === 'ALL_ORDERS' && <AllOrdersComponent />

            }
            {
                currentPage === 'ORDERED' && <OrderedItemsComponent />
            }
            {
                currentPage === 'PROCCESSED' && <ProcessedOrdersComponent />
            }
            {
                currentPage === 'CANCELLED' && <CancelledOrdersComponent />
            }
            {
                currentPage === 'TRANSIT' && <TransitOrdersComponent />
            }
            {
                currentPage === 'DELIVERED' && <DeliveredOrdersComponent />
            }
            {
                currentPage === 'SEARCH' && <SearchOrdersComponent />
            }
        </div>
    )
}
export default OrdersPage;