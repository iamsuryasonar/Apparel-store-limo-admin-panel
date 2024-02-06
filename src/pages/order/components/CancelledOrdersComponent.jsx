import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { get_all_cancelled_products, update_order_status } from "../../../store/slices/cancelledProductsSlice";
import ImageCarousal from '../../../components/ImageCarousal'
import { ORDERSTATUS } from '../../../common/constants'
import Pagination from '../../../components/Pagination'
import { filterItems } from '../../../common/constants'

function CancelledOrdersComponent() {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.cancelled.cancelled);
    const [modalItem, setModalItem] = useState(null);
    const [modalVisible, setModalVisibility] = useState(false);
    const [orderStatus, setOrderStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filterInfo, setFilterInfo] = useState(filterItems.OLDEST_FIRST)
    const [toggleDropdown, setToggleDropdown] = useState(false)

    const fetchOrdersData = async (pageNo, filterInfo) => {
        dispatch(get_all_cancelled_products({ pageNo, filterInfo }));
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
        <div className='relative w-full flex flex-col'>
            <div className='place-self-end '>
                <div className="place-self-end flex flex-col">
                    <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded min-w-56 flex items-center justify-between"
                        onClick={(e) => {
                            setToggleDropdown(!toggleDropdown);
                        }}
                    >
                        <span className="mr-1">Filter</span>
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
                    </button>
                    {toggleDropdown &&
                        <ul className=" bg-slate-200 pt-1">
                            <li className=""><p className="rounded-t bg-slate-300 hover:bg-slate-600 hover:text-white py-2 px-4 block whitespace-no-wrap cursor-pointer"
                                onClick={() => {
                                    setFilterInfo(filterItems.NEWEST_FIRST)
                                }}
                            >Newest first</p></li>
                            <div className=' h-[1px] bg-slate-200 '></div>
                            <li className=""><p className="bg-slate-300 hover:bg-slate-600 hover:text-white py-2 px-4 block whitespace-no-wrap cursor-pointer"
                                onClick={() => {
                                    setFilterInfo(filterItems.OLDEST_FIRST)
                                }}
                            >Oldest first</p></li>
                        </ul>
                    }
                </div>
            </div>
            <div className="w-full mt-2 grid grid-cols-1 md:grid-cols-2 gap-16">
                {
                    orders?.orders?.map((item) => {
                        return <div key={item._id} className='flex flex-col gap-2'>
                            <div className='place-self-center w-full'>
                                <ImageCarousal images={item.item.colorvariant.images} />
                            </div>
                            <div className=' flex flex-row justify-between items-center'>
                                <img className='w-10 h-10' src={item.item.colorvariant.thumbnail.url} />
                                <p className='font-bold'>{item.status}</p>
                                <button onClick={
                                    () => {
                                        setModalItem(item);
                                        setModalVisibility(!modalVisible);
                                    }
                                } className='p-2 bg-green-500 hover:bg-green-600 text-white rounded-md'>PROCESS</button>
                            </div>
                            <p className='font-semibold text-slate-500'>Name: {item.item.product.name}</p>
                            <p className='font-semibold '>ID: {item._id}</p>
                            <div className='p-4 border-[1px] border-black flex flex-row justify-between'>
                                <p>Size:  {item.item.sizevariant.name}</p>
                                <p>Quantity: {item.item.quantity}</p>
                                <p>Total: Rs. {item.totalamount}</p>
                            </div>
                            <div className='p-4 border-[1px] border-black'>
                                <p>Address Information:</p>
                                <p>Name:  {item.customer.firstName + ' ' + item.customer.lastName}</p>
                                <p>Contact: {item.address.contactnumber}</p>
                                <p>Email: {item.customer.email}</p>
                                <p>pin code: {item.address.pin}</p>
                                <p>Town: {item.address.town}</p>
                                <p>State: {item.address.state}</p>
                            </div>
                            <div className='h-[1px] bg-slate-500 my-2'></div>
                        </div>
                    })
                }
            </div>
            {modalVisible &&
                <div className="absolute m-4 top-0 right-0 left-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg overflow-y-auto max-h-screen w-screen">
                        <div className='flex flex-row justify-between'>
                            <p className="text-xl font-semibold mb-4">Process order</p>
                            <button onClick={
                                () => {
                                    setModalVisibility(!modalVisible);
                                    setModalItem(null);
                                }
                            } className="bg-red-500 text-white py-2 px-4 rounded">
                                Close Modal
                            </button>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='place-self-center w-full'>
                                <ImageCarousal images={modalItem.item.colorvariant.images} />
                            </div>
                            <div className=' flex flex-row justify-between items-center'>
                                <img className='w-10 h-10' src={modalItem.item.colorvariant.thumbnail.url} />
                                <p className='font-semibold text-slate-500'>Name: {modalItem.item.product.name}</p>
                                <p className='font-semibold text-slate-600'>ID: {modalItem._id}</p>
                            </div>
                            <div className='p-4 border-[1px] border-black flex flex-row justify-between'>
                                <p>Size:  {modalItem.item.sizevariant.name}</p>
                                <p>Quantity: {modalItem.item.quantity}</p>
                                <p>Total: Rs. {modalItem.totalamount}</p>
                            </div>
                            <div className=' flex flex-col md:flex-row justify-between items-center gap-2 p-4 border-[1px] border-black'>
                                <div className='w-full '>
                                    <p>Address Information:</p>
                                    <p>Name:  {modalItem.customer.firstName + ' ' + modalItem.customer.lastName}</p>
                                    <p>Contact: {modalItem.address.contactnumber}</p>
                                    <p>Email: {modalItem.customer.email}</p>
                                    <p>pin code: {modalItem.address.pin}</p>
                                    <p>Town: {modalItem.address.town}</p>
                                    <p>State: {modalItem.address.state}</p>
                                </div>
                                <div className='w-full p-4 border-[1px] border-black'>
                                    <form className="w-full flex flex-col gap-6 font-light">
                                        <select onChange={(e) => { setOrderStatus(e.target.value) }} value={modalItem.status} className='p-1 border-[1px] bg-white rounded-sm border-black w-full placeholder:p-2'>
                                            {
                                                ORDERSTATUS?.map((status) => {
                                                    return <option key={status} value={status} className=''> {status}</option>
                                                })
                                            }
                                        </select>
                                    </form>
                                    <button
                                        onClick={() => {
                                            updateOrderStatusHandler(modalItem._id)
                                        }}
                                        className="text-xl font-thin w-full my-4 h-10 aspect-square bg-slate-500  text-white"
                                        type="button"
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                            <div className='h-[1px] bg-slate-500 my-2'></div>
                        </div>
                    </div>
                </div>
            }
            {orders?.pagination?.total_orders === 0 && <p className='self-end'>No orders found </p>}
            <div className='h-[1px] bg-slate-500 my-2'></div>
            <Pagination currentPage={currentPage} totalPages={orders?.pagination.total_pages} totalOrders={orders?.pagination.total_orders} handlePageChange={handlePageChange} />
        </div>
    )
}

export default CancelledOrdersComponent