import ProductDataTable from "./component/ProductDataTable";
import { useDispatch, useSelector } from 'react-redux'
import EditProduct from './component/EditProduct.jsx';

import { useState } from 'react'

function ProductPage() {
    const loading = useSelector((state) => state.loading.value);
    const [editProductToggle, setEditProductToggle] = useState(false);
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState(null);

    const onEditToggle = (product, categories) => {
        if (product) {
            setProduct(product);
        }
        console.log(categories)
        if (categories) {
            setCategories(categories)
        }
        setEditProductToggle(!editProductToggle);
    }

    return (
        <>
            {editProductToggle ? (<EditProduct onEditToggle={onEditToggle} product={product} categories={categories} />) : (
                <div className='w-full flex justify-center items-center'>
                    <div className='max-w-4xl w-full my-10 gap-4'>
                        <div className='w-full  flex flex-col'>
                            <ProductDataTable onEditToggle={onEditToggle} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProductPage;