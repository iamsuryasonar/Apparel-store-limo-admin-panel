import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_an_order, update_order_status, clearOrder } from '../../../store/slices/orderSlice'
import { clearMessage } from '../../../store/slices/messageSlice'
import ImageCarousal from '../../../components/ImageCarousal'
import { ORDERSTATUS } from '../../../common/constants'

function SearchOrdersComponent() {
    const dispatch = useDispatch();
    const order = useSelector((state) => state.order.order);
    const [id, setId] = useState('');
    const [orderStatus, setOrderStatus] = useState('');

    const onSearchHandler = () => {
        dispatch(get_an_order(id));
    }

    const updateOrderStatusHandler = (id) => {
        dispatch(update_order_status({
            id,
            status: orderStatus,
        })).then(() => {
            dispatch(get_an_order(id));
        });
    }

    useEffect(() => {
        dispatch(clearMessage())
        dispatch(clearOrder());
    }, [])

    return <>
        <div className="flex flex-row gap-2">
            <input onChange={(e) => { setId(e.target.value) }} name='id' type="text" placeholder='Product id' className="w-full p-1 border-[1px] rounded-sm border-black placeholder:p-2 "></input>
            <button
                onClick={
                    onSearchHandler
                }
                className="w-24 text-xl font-thin h-10  aspect-square bg-slate-600 hover:bg-black text-white  active:bg-black"
                type="button"
            >
                Search
            </button>
        </div>
        {
            order && <>
                <div className='flex flex-col gap-2'>
                    <div className='place-self-center w-full'>
                        <ImageCarousal images={order?.item.colorvariant.images} />
                    </div>
                    <div className=' flex flex-row justify-between items-center'>
                        <img className='w-10 h-10' src={order?.item.colorvariant.thumbnail.url} />
                        <p className='font-bold'>{order?.status}</p>
                    </div>
                    <p className='font-semibold text-slate-500'>Name: {order?.item.product.name}</p>
                    <p className='font-semibold '>ID: {order?._id}</p>
                    <div className='p-4 border-[1px] border-black flex flex-row justify-between'>
                        <p>Size:  {order?.item.sizevariant.name}</p>
                        <p>Quantity: {order?.item.quantity}</p>
                        <p>Total: Rs. {order?.totalamount}</p>
                    </div>
                    <div className=' flex flex-col md:flex-row justify-between items-center gap-2 p-4 border-[1px] border-black'>
                        <div className='w-full '>
                            <p>Address Information:</p>
                            <p>Name:  {order?.customer.firstName + ' ' + order?.customer.lastName}</p>
                            <p>Contact: {order?.address.contactnumber}</p>
                            <p>Email: {order?.customer.email}</p>
                            <p>pin code: {order?.address.pin}</p>
                            <p>Town: {order?.address.town}</p>
                            <p>State: {order?.address.state}</p>
                        </div>
                        <div className='w-full p-4 border-[1px] border-black'>
                            <form className="w-full flex flex-col gap-6 font-light">
                                <select onChange={(e) => { setOrderStatus(e.target.value) }} value={orderStatus === '' ? order?.status : orderStatus} className='p-1 border-[1px] bg-white rounded-sm border-black w-full placeholder:p-2'>
                                    {
                                        ORDERSTATUS?.map((status) => {
                                            return <option key={status} value={status} className=''> {status}</option>
                                        })
                                    }
                                </select>
                            </form>
                            <button
                                onClick={() => {
                                    updateOrderStatusHandler(order?._id)
                                }}
                                className="text-xl font-thin w-full my-4 h-10 aspect-square bg-slate-600 hover:bg-black text-white active:bg-black"
                                type="button"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>

            </>
        }
    </>
}
export default SearchOrdersComponent;