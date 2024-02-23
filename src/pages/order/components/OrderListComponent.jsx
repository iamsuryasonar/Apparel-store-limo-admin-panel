import ImageCarousal from '../../../components/ImageCarousal'

function OrderList({ modalVisible, orders, setModalItem, setModalVisibility }) {
    return (
        <div className="w-full mt-2 grid grid-cols-1 md:grid-cols-2 gap-16">
            {
                orders?.map((item) => {
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
                            <p>Contact: {item.contact_number}</p>
                            <p>Email: {item.customer.email}</p>
                            <p>pin code: {item.pin}</p>
                            <p>Town: {item.town}</p>
                            <p>State: {item.state}</p>
                        </div>
                        <div className='h-[1px] bg-slate-500 my-2'></div>
                    </div>
                })
            }
        </div>
    )
}

export default OrderList;