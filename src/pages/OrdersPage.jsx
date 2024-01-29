import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { get_all_orders } from "../store/slices/ordersSlice";

function OrdersPage() {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders.orders);

    useEffect(() => {
        dispatch(get_all_orders());
    }, [])

    return (
        <div className='w-full p-6'>
            <div className="w-full p-2 flex flex-col justify-center items-center border-[1px] border-black">
                {
                    orders?.map((item) => {
                        return <div>
                            {console.log(item)}
                            <div className='flex flex-row gap-2'>
                                {item.item.colorvariant.images?.map((image) => {
                                    return <img className='w-20 h-20' src={image.url} />
                                })}
                            </div>
                            <img className='w-10 h-10 rounded-full m-2' src={item.item.colorvariant.thumbnail.url} />
                            <p>Name: {item.item.product.name}</p>
                            <p>Size:  {item.item.sizevariant.name}</p>
                            <p>Quantity: {item.item.quantity}</p>
                            <p>Total: Rs. {item.totalamount}</p>
                            <p>Address Information:</p>
                            <p>Name:  {item.customer.firstName + ' ' + item.customer.lastName}</p>
                            <p>Contact: {item.address.contactnumber}</p>
                            <p>Email: {item.customer.email}</p>
                            <p>pin code: {item.address.pin}</p>
                            <p>Town: {item.address.town}</p>
                            <p>State: {item.address.state}</p>
                            <div className='h-[1px] bg-slate-500 my-2'></div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default OrdersPage;

function Corausal() {
    return (
        <>

        </>
    )
}