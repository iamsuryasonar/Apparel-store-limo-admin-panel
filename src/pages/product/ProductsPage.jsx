import ProductsDataTable from "./components/ProductsDataTable.jsx";
import { useDispatch, useSelector } from 'react-redux'
import EditProduct from './components/EditProduct.jsx';
import BottomAlert from '../../components/BottomAlert.jsx'
import { useState } from 'react'
import ViewProduct from './components/ViewProduct.jsx'

function ProductsPage() {
    const message = useSelector((state) => state.message.message);
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState(null);
    const [component, setComponent] = useState(null);

    //? callback function to get product and categories from productsDataTable, since data is retrieved there.
    const onComponentToggle = (type, productInfo, categories) => {
        if (productInfo) {
            setProduct(productInfo);
        }

        if (categories) {
            setCategories(categories)
        }
        setComponent(type)
    }

    if (component === 'EDIT') {
        return <>
            {message && <BottomAlert message={message} />}
            <EditProduct onComponentToggle={onComponentToggle} categories={categories} productId={product._id} />
        </>
    }

    if (component === 'VIEW') {
        return <>
            {message && <BottomAlert message={message} />}
            <ViewProduct onComponentToggle={onComponentToggle} productId={product._id} />
        </>

    }

    return (
        <>
            {message && <BottomAlert message={message} />}
            <div className=''>
                <ProductsDataTable onComponentToggle={onComponentToggle} />
            </div>
        </>
    )
}

export default ProductsPage;