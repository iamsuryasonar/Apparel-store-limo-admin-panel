import ImageCarousal from '../../../components/ImageCarousal'
import { ORDERSTATUS } from '../../../common/constants'

function OrderModal({ modalItem, modalVisible, setModalItem, setModalVisibility, orderStatus, setOrderStatus, updateOrderStatusHandler }) {
    return (
        <div className="z-10 fixed inset-0 w-full h-full  bg-opacity-50 flex items-center justify-center bg-black/[.8] ">
            <div className='bg-slate-200 relative w-full md:w-4/5 lg:w-[700px] h-3/4 p-5 rounded-md'>
                <div className="w-full h-full  rounded ">
                    <button onClick={
                        () => {
                            setModalVisibility(!modalVisible);
                            setModalItem(null);
                        }
                    } className="z-10 absolute top-3 right-3 bg-red-600 text-white w-10 h-10 rounded-full text-2xl ">
                        X
                    </button>
                    <div className='h-full flex flex-col'>
                        <div className='flex flex-row justify-between my-2 '>
                            <p className="text-xl font-semibold place-self-center">Process order</p>
                        </div>
                        <div className='h-full flex flex-col gap-2 overflow-y-scroll scrollbar overscroll-none  shadow-lg '>
                            <div className='place-self-center w-full'>
                                <ImageCarousal images={modalItem.item.colorvariant.images} />
                            </div>
                            <div className=' flex flex-row justify-between items-center gap-2'>
                                <img className='w-10 h-10' src={modalItem.item.colorvariant.thumbnail.url} />
                                <p className='font-bold'>{modalItem.item.product.name}</p>
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
                                    <p>Contact: {modalItem.contact_number}</p>
                                    <p>Email: {modalItem.customer.email}</p>
                                    <p>pin code: {modalItem.pin}</p>
                                    <p>Town: {modalItem.town}</p>
                                    <p>State: {modalItem.state}</p>
                                </div>
                                <div className='w-full p-4 border-[1px] border-black'>
                                    <form className="w-full flex flex-col gap-6 font-light">
                                        <select onChange={(e) => { setOrderStatus(e.target.value); }} value={orderStatus === '' ? modalItem.status : orderStatus} className='p-1 border-[1px] bg-white rounded-sm border-black w-full placeholder:p-2'>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderModal;