import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import AddColorVariant from './components/AddColorVariant';
import BottomAlert from '../../components/BottomAlert'
import { get_all_categories } from '../../store/slices/categorySlice';
import { add_product } from '../../store/slices/productsSlice';
import { setMessage, clearMessage } from '../../store/slices/messageSlice';
import { PRODUCT_TAG, GENDERS } from '../../common/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

function AddProductPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector((state) => state.categories.categories);
    const message = useSelector((state) => state.message.message);
    const [productValues, setProductValues] = useState(
        {
            name: '',
            description: '',
            gender: '',
            keyword: '',
            tag: '',
            categoryId: '',
        },
    );

    useEffect(() => {
        dispatch(get_all_categories());
    }, [])

    const [variantFormIsVisible, setTogleVariantForm] = useState(false);

    const onProductChange = (e) => {
        setProductValues({
            ...productValues,
            [e.target.name]: e.target.value,
        })
    }

    let addProductHandler = (productValues, colorVariantValues, imageValues, sizeValues) => {
        // validating before api call 
        // todo slit the code
        if (!productValues?.name || !productValues?.gender || !productValues?.description || !productValues?.category || !productValues?.keyword || !productValues?.tag) {
            dispatch(setMessage("Product fields can't be empty!"));
            setTimeout(() => {
                dispatch(clearMessage());
            }, 3000);
            return;
        }

        if (!colorVariantValues?.name || !colorVariantValues?.thumbnail) {
            dispatch(setMessage("Color variant fields can't be empty!"));
            setTimeout(() => {
                dispatch(clearMessage());
            }, 3000);
            return;
        }

        for (let i = 0; i < imageValues.length; i++) {
            if (!imageValues[i]?.image) {
                dispatch(setMessage("Must have at least one image"));
                setTimeout(() => {
                    dispatch(clearMessage());
                }, 3000);
                return;
            }
        }

        for (let i = 0; i < sizeValues.length; i++) {
            if (!sizeValues[i]?.name || !sizeValues[i]?.stock || !sizeValues[i]?.mrp || !sizeValues[i]?.selling_price) {
                dispatch(setMessage("Size variant fields can't be empty!"));
                setTimeout(() => {
                    dispatch(clearMessage());
                }, 3000);
                return;
            }
        }

        let body = {
            product: productValues,
            colorVariant: colorVariantValues,
            images: imageValues,
            sizeVariants: sizeValues,
        }

        dispatch(add_product(body)).then(() => [
            navigate('/products')
        ]);
    }

    return (
        <div className='w-full'>
            {message && <BottomAlert message={message} />}
            <div className="w-full p-2 flex flex-col md:flex-row justify-center items-center border-[1px] border-black ">
                <form className="w-full m-2  flex flex-col gap-6 font-light ">
                    <input onChange={onProductChange} name='name' type="text" placeholder='Name' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                    <input onChange={onProductChange} name='description' type="text" placeholder='Description' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                    <input onChange={onProductChange} name='keyword' type="text" placeholder='Keyword' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                    <select onChange={onProductChange} name='gender' className='p-1 border-[1px] bg-white rounded-sm border-black w-full placeholder:p-2  drop-shadow-sm'>
                        <option value='' className=''>Select gender...</option>
                        {
                            GENDERS?.map((gender) => {
                                return <option key={gender} value={gender} className=''> {gender}</option>
                            })
                        }
                    </select>
                    <select onChange={onProductChange} name='tag' className='p-1 border-[1px] bg-white rounded-sm border-black w-full placeholder:p-2  drop-shadow-sm'>
                        <option value='' className=''>Select tag...</option>
                        {
                            PRODUCT_TAG?.map((tag) => {
                                return <option key={tag} value={tag} className=''> {tag}</option>
                            })
                        }
                    </select>
                    <select onChange={onProductChange} name='categoryId' className='p-1 border-[1px] bg-white rounded-sm border-black w-full placeholder:p-2  drop-shadow-sm'>
                        <option value='' className=''>Select category...</option>
                        {
                            categories?.map((category) => {
                                return <option key={category._id} value={category._id} className=''> {category.name}</option>
                            })
                        }
                    </select>
                </form>
                <div className='w-full m-2 p-6 border-[1px] border-slate-400 flex flex-row justify-start items-center '>
                    <p className='w-full'>Color Variant</p>
                    <button
                        onClick={() => setTogleVariantForm(!variantFormIsVisible)}
                        className="text-2xl w-full h-10 aspect-square bg-slate-300 text-black hover:bg-slate-600 hover:text-white active:bg-slate-600 active:text-white"
                        type="button"
                    >
                        {!variantFormIsVisible && <FontAwesomeIcon icon={faPlus} />}
                        {variantFormIsVisible && <FontAwesomeIcon icon={faMinus} />}
                    </button>
                </div>
            </div>
            {variantFormIsVisible && (<AddColorVariant task={'ADD'} product={productValues} handler={addProductHandler} />)}
        </div>
    )
}
export default AddProductPage;