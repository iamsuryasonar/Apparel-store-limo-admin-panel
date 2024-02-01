import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { add_product } from '../../store/slices/productsSlice';
import { get_all_categories } from '../../store/slices/categorySlice';
import AddColorVariant from './components/AddColorVariant';
import { useNavigate } from 'react-router-dom'

function AddProductPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector((state) => state.categories.categories);
    const [productValues, setProductValues] = useState(
        {
            name: '',
            description: '',
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
        <div className='w-full p-6 '>
            <div className="w-full p-2 flex flex-col md:flex-row justify-center items-center border-[1px] border-black ">
                <form className="w-full m-2  flex flex-col gap-6 font-light ">
                    <input onChange={onProductChange} name='name' type="text" placeholder='Name' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                    <input onChange={onProductChange} name='description' type="text" placeholder='Description' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                    <input onChange={onProductChange} name='keyword' type="text" placeholder='Keyword' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                    <input onChange={onProductChange} name='tag' type="text" placeholder='Tag' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                    <select onChange={onProductChange} name='categoryId' className='p-1 border-[1px] bg-white rounded-sm border-black w-full placeholder:p-2  drop-shadow-sm'>
                        <option value='' className=''>SELECT...</option>
                        {
                            categories?.map((category) => {
                                return <option key={category._id} value={category._id} className=''> {category.name}</option>
                            })
                        }
                    </select>
                </form>
                <div className='w-full m-2 p-6 border-[1px] border-slate-400 flex flex-col justify-start '>
                    <p>Color Variant</p>
                    <div className='w-full pl-8 flex flex-col '>
                        {/* todo: onClick of a variant it will call api to fetch variant data to fill in the input fields, so that it could be updated in the form itself */}
                        <a className='py-1 cursor-pointer underline underline-offset-4 text-black font-light hover:font-normal hover:text-green-500'>Variant A</a>
                        <a className='py-1 cursor-pointer underline underline-offset-4 text-black font-light hover:font-normal hover:text-green-500'>Variant B</a>
                        <a className='py-1 cursor-pointer underline underline-offset-4 text-black font-light hover:font-normal hover:text-green-500'>Variant C</a>
                        {!variantFormIsVisible && <button onClick={() => setTogleVariantForm(!variantFormIsVisible)} className="px-4 py-1 self-start text-black font-light hover:font-normal hover:text-green-500 underline  underline-offset-4">add more variant...</button>}
                        {variantFormIsVisible && <button onClick={() => setTogleVariantForm(!variantFormIsVisible)} className="px-4 py-1 self-start text-black font-light hover:font-normal hover:text-green-500 underline  underline-offset-4">close variant form...</button>}
                    </div>
                </div>
            </div>
            {variantFormIsVisible && (<AddColorVariant task={'ADD'} product={productValues} handler={addProductHandler} />)}
            <div className='w-full h-[1px] my-2 bg-slate-300'></div>
        </div>
    )
}
export default AddProductPage;