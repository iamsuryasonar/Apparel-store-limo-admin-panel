import ProductDataTable from "./component/ProductDataTable";
import { useDispatch, useSelector } from 'react-redux'

function ProductPage() {
    const loading = useSelector((state) => state.loading.value);
    return (
        <div className='w-full flex justify-center items-center'>
            <div className='max-w-4xl w-full my-10 gap-4'>
                <div className='w-full  flex flex-col'>
                    <ProductDataTable />
                </div>
            </div>
        </div>
    )
}

export default ProductPage;