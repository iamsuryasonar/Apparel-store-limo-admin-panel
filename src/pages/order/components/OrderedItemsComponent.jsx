import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../../components/Pagination'
import OrderModal from './OrderModalComponent'
import OrderList from './OrderListComponent'
import FilterDropdown from './FilterDropdownComponent'
import { get_all_ordered_products, update_order_status } from "../../../store/slices/orderedProductsSlice";
import { filterItems } from '../../../common/constants'

function OrderedItemsComponent() {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.ordered.ordered);
    const [modalItem, setModalItem] = useState(null);
    const [modalVisible, setModalVisibility] = useState(false);
    const [orderStatus, setOrderStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filterInfo, setFilterInfo] = useState(filterItems.OLDEST_FIRST)
    const [toggleDropdown, setToggleDropdown] = useState(false)

    const fetchOrdersData = async (pageNo, filterInfo) => {
        dispatch(get_all_ordered_products({ pageNo, filterInfo }));
    };

    useEffect(() => {
        fetchOrdersData(currentPage, filterInfo);
    }, [currentPage, filterInfo]);

    const updateOrderStatusHandler = (id) => {
        dispatch(update_order_status({
            id,
            status: orderStatus,
        })).then(() => {
            fetchOrdersData(currentPage);
            setModalVisibility(!modalVisible);
            setModalItem(null);
        })
    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <div className={`w-auto h-auto flex flex-col justify-center items-center`}>
                <div className='place-self-end '>
                    <FilterDropdown filterInfo={filterInfo}  toggleDropdown={toggleDropdown} setToggleDropdown={setToggleDropdown} setFilterInfo={setFilterInfo} />
                </div>
                <OrderList orders={orders?.orders} modalVisible={modalVisible} setModalItem={setModalItem} setModalVisibility={setModalVisibility} />
                {orders?.pagination?.total_orders === 0 && <p className='self-end'>No orders found </p>}
                <div className='h-[1px] bg-slate-500 my-2'></div>
                <Pagination perPage={orders?.pagination.per_page} currentPage={currentPage} totalPages={orders?.pagination.total_pages} totalOrders={orders?.pagination.total_orders} handlePageChange={handlePageChange} />
            </div>
            {modalVisible &&
                <OrderModal modalItem={modalItem} modalVisible={modalVisible} setModalItem={setModalItem} setModalVisibility={setModalVisibility} orderStatus={orderStatus} setOrderStatus={setOrderStatus} updateOrderStatusHandler={updateOrderStatusHandler} />
            }
        </>
    )
}

export default OrderedItemsComponent;



