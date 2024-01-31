import { useState } from 'react'
import AllOrdersComponent from './components/AllOrdersComponent'
import OrderedItemsComponent from './components/OrderedItemsComponent'
import ProcessedOrdersComponent from './components/ProcessedOrdersComponent'
import CancelledOrdersComponent from './components/CancelledOrdersComponent'
import TransitOrdersComponent from './components/TransitOrdersComponent'
import DeliveredOrdersComponent from './components/DeliveredOrdersComponent'
import SearchOrdersComponent from './components/SearchOrdersComponent'

function OrdersPage() {
    const [currentPage, setCurrentPage] = useState('ALL_ORDERS')

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

    return <div className='w-full p-6 flex flex-col gap-4'>
        <div className='flex flex-row justify-start gap-2'>
            {
                pages.map((item) => {
                    return <button key={item.id} onClick={
                        () => {
                            setCurrentPage(item.id)
                        }
                    } className={`bg-green-500 hover:bg-green-600 text-white p-2 rounded-md ${currentPage === item.id ? 'bg-green-700' : ''}`}>{item.name}</button>
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
}
export default OrdersPage;