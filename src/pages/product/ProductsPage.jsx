import ProductsDataTable from "./components/ProductsDataTable.jsx";
import { useDispatch, useSelector } from 'react-redux'
import EditProduct from './components/EditProduct.jsx';
import BottomAlert from '../../components/BottomAlert.jsx'
import { useState } from 'react'

function ProductsPage() {
    const message = useSelector((state) => state.message.message);
    const [editProductToggle, setEditProductToggle] = useState(false);
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState(null);

    const onEditToggle = (product, categories) => {
        if (product) {
            setProduct(product);
        }

        if (categories) {
            setCategories(categories)
        }
        setEditProductToggle(!editProductToggle);
    }

    return (
        <>
            {message && <BottomAlert message={message} />}
            {editProductToggle ? (<EditProduct onEditToggle={onEditToggle} categories={categories} productId={product._id} />) : (
                <div className=''>
                    <ProductsDataTable onEditToggle={onEditToggle} />
                </div>
            )}
        </>
    )
}

export default ProductsPage;