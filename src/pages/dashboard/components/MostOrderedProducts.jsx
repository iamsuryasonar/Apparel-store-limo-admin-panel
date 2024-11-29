import AnalyticsServices from "../../../services/analytics.services";
import { useState, useEffect } from 'react';

const MostOrderedProducts = () => {

    const [mostOrderedProducts, setMostOrderedProducts] = useState(null);


    const getMostOrderedProducts = async () => {
        const result = await AnalyticsServices.getMostOrderedProducts();
        setMostOrderedProducts(result.mostOrderedProducts);
    }

    useEffect(() => {
        getMostOrderedProducts();
    }, [])

    return (
        <div className='w-full'>
            <div className='w-full p-4 flex flex-col rounded-lg bg-slate-200'>
                <div className='flex justify-center items-center'>
                    <div className="w-full max-h-[400px] lg:col-span-4 lg:row-span-3 flex flex-col gap-2 rounded-md text-black">
                        <h1 className="font-bold">Best Sellers</h1>
                        <div className="w-full h-full overflow-auto custom-scrollbar">
                            <table className="w-full table-auto divide-y divide-slate-700">
                                <thead>
                                    <tr>
                                        <th className="py-2  text-left">Product</th>
                                        <th className="py-2 pr-6 text-left">Product id</th>
                                        <th className="py-2 pr-6 text-left">Category</th>
                                        <th className="py-2 pr-6 text-left">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700">
                                    {mostOrderedProducts && mostOrderedProducts.map((product, index) => (
                                        <tr key={product._id}>
                                            <td className="py-2 pr-6 whitespace-nowrap">{product.name}</td>
                                            <td className="py-2 pr-6 whitespace-nowrap">{product._id}</td>
                                            <td className="py-2 pr-6 whitespace-nowrap">{product.category.name}</td>
                                            <td className="py-2 pr-6 whitespace-nowrap">{product.totalQuantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MostOrderedProducts; 