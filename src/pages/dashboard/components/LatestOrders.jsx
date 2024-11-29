const LatestOrders = (props) => {

    const { latestOrders } = props;

    return (
        <div className='w-full'>
            <div className='w-full p-4 flex flex-col rounded-lg bg-slate-200'>
                <div className='flex justify-center items-center'>
                    <div className="w-full max-h-[400px] lg:col-span-4 lg:row-span-3 flex flex-col gap-2 rounded-md text-black">
                        <h1 className="font-bold">Recent Orders</h1>
                        <div className="w-full h-full overflow-auto custom-scrollbar">
                            <table className="w-full table-auto divide-y divide-slate-700">
                                <thead>
                                    <tr>
                                        <th className="py-2  text-left">Customer</th>
                                        <th className="py-2 pr-6 text-left">Order No.</th>
                                        <th className="py-2 pr-6 text-left">Amount</th>
                                        <th className="py-2 pr-6 text-left">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700">
                                    {latestOrders.map((order, index) => (
                                        <tr key={order._id}>
                                            <td className="flex items-center py-2 pr-6 whitespace-nowrap">
                                                {/* <img
                                                    className="h-8 w-8 rounded-full mr-1"
                                                    src={order.profilePic}
                                                    alt=""
                                                /> */}
                                                <span className="">{order.customer.firstName + " " + order.customer.lastName}</span>
                                            </td>
                                            <td className="py-2 pr-6 whitespace-nowrap">{order._id}</td>
                                            <td className="py-2 pr-6 whitespace-nowrap">{`₹${order.totalamount}`}</td>
                                            <td className="py-2 pr-6 whitespace-nowrap">
                                                <div
                                                    className={`px-3 rounded-full inline-block text-center ${order.status === 'DELIVERED'
                                                        ? 'bg-green-700 text-green-400'
                                                        : 'bg-red-700 text-red-400'
                                                        }`}
                                                >
                                                    <p>{order.status}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default LatestOrders;