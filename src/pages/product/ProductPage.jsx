import ProductDataTable from "./component/ProductDataTable";

function ProductPage() {

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