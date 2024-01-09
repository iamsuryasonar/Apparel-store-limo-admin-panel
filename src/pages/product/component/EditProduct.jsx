import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { add_color_and_its_size_variant, update_product_info, add_size_variant, update_size_variant, update_thumbnail, update_image, add_image } from '../../../store/slices/productSlice';
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddColorVariant from './AddColorVariant'

function EditProduct({ onEditToggle, product, categories }) {

    const dispatch = useDispatch();
    const [showColorVariant, setShowColorVariant] = useState(true);
    const [showColorVariantForm, setShowColorVariantForm] = useState(false)
    const [showImageInputField, setShowImageInputField] = useState(false)
    const [showThumbnailInputField, setShowThumbnailInputField] = useState(false)
    const [showUpdateButton, setShowUpdateButton] = useState(false)
    const [selectedColorVariant, setSelectedColorVariant] = useState(0);
    const [showAddImageInputField, setShowAddImageInputField] = useState(false)
    const [openedSizeEditForm, setOpenedSizeEditForm] = useState(null)
    const [imageValue, setImageValue] = useState();
    const [productValues, setProductValues] = useState(
        {
            name: product?.name || '',
            description: product?.description || '',
            keyword: product?.keyword || '',
            tag: product?.tag || '',
            category: product?.category || '',
        },
    );

    const [sizeValues, setSizeValues] = useState(
        {
            name: '',
            status: 'IN-STOCK',
            stock: '',
            mrp: '',
            selling_price: '',
        },
    );

    const onProductChange = (e) => {
        setProductValues({
            ...productValues,
            [e.target.name]: e.target.value,
        })
    }

    let onImageChange = (file) => {
        setImageValue({ image: file });
    };
    const onSizeChange = (e) => {
        setSizeValues({
            ...sizeValues,
            [e.target.name]: e.target.value,
        })
    }

    const sizeVariantEditHandler = (id) => {
        setOpenedSizeEditForm(id)
        setShowUpdateButton(!showUpdateButton)
    }


    const addImageHandler = (colorVariantId) => {
        if (colorVariantId) {
            dispatch(add_image({ colorVariantId, image: imageValue.image }));
        }
    }

    let addColorVariantAndSizeVariantHandler = (productId, colorVariantValues, imageValues, sizeValues) => {
        if (productId) {
            let body = {
                productId: productId,
                colorVariant: colorVariantValues,
                images: imageValues,
                sizeVariants: sizeValues,
            }
            dispatch(add_color_and_its_size_variant(body));
        }
        else {
            console.log('product id not found!!')
        }
    }
    const sizeVariantUpdateHandler = (id) => {
        let data = {
            sizeVariant: sizeValues,
            sizeVariantId: id,
        }
        if (id) {
            dispatch(update_size_variant(data));
        }
        else {
            console.log('product id not found!!')
        }
    };
    let updateProductInfoHandler = () => {
        let data = {
            product: productValues,
            productId: product?.id
        }
        if (product?.id) {

            dispatch(update_product_info(data));
        }
        else {
            console.log('product id not found!!')
        }
    }

    const updateThumbnailHandler = (thumbnailPath, colorVariantId) => {

        if (thumbnailPath) {
            dispatch(update_thumbnail({ thumbnailPath, colorVariantId, image: imageValue.image }));
        }
    }
    const updateImageHandler = (path, imageId) => {
        if (path) {
            dispatch(update_image({ path, imageId, image: imageValue.image }));
        }
    }



    return (
        <div className='w-full p-6 grid place-content-center'>
            <div className='flex flex-row justify-between'>
                <p className='text-bold text-2xl'>Update Product</p>
                <FontAwesomeIcon className="text-3xl hover:scale-150 transition-all duration-300 ease-in-out " icon={faXmark} onClick={onEditToggle} />
            </div>
            <div className='w-full flex flex-col'>
                <div className='w-full place-self-center my-10 '>
                    <div className="w-full p-2 flex flex-col justify-center items-center border-[1px] border-black">
                        <form className="w-full m-2 flex flex-col gap-6 font-light ">
                            <input onChange={onProductChange} value={productValues.name} name='name' type="text" placeholder='Name' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                            <input onChange={onProductChange} value={productValues.description} name='description' type="text" placeholder='Description' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                            <input onChange={onProductChange} value={productValues.keyword} name='keyword' type="text" placeholder='Keyword' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                            <input onChange={onProductChange} value={productValues.tag} name='tag' type="text" placeholder='Tag' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                            <select onChange={onProductChange} value={productValues.category} name='category' className='p-1 border-[1px] bg-white rounded-sm border-black w-full placeholder:p-2  drop-shadow-sm'>
                                {categories?.map((category) => {
                                    return <option key={category._id} value={category._id} className=''> {category.name}</option>
                                })}
                            </select>
                        </form>
                        <button onClick={updateProductInfoHandler} className='place-self-end py-2 px-4 bg-green-300 rounded-md'>Update</button>
                    </div>
                    <div className='w-full h-[1px] my-2 bg-slate-300'></div>
                    <p className='self-start' >Color Variant:</p>
                    <div className='w-full h-[1px] my-2 bg-slate-300'></div>


                    {/* list of color variants*/}
                    <div className='w-full flex flex-row gap-4'>
                        {product?.colorvariants?.map((item, index, arr) => {
                            return <img key={item._id} onClick={() => { setSelectedColorVariant(index); setShowColorVariant(true); setShowColorVariantForm(false); }} className={`w-10 h-10 my-4 rounded-full ${selectedColorVariant === index ? ` border-4 border-black` : ``}`} src={arr[index]?.thumbnail.url}></img>
                        })}
                        <div onClick={() => { setShowColorVariantForm(true); setShowColorVariant(false) }} className='w-10 h-10 my-4 rounded-full  border-4 border-slate-400 text-4xl flex justify-center items-center'>+</div>
                    </div>
                    {/* when clicked on color image above this becomes visible */}
                    {showColorVariant &&
                        <>
                            <div className='w-full h-[1px] my-2 bg-slate-500'></div>

                            <p>Color thumbnail:</p>
                            <div className='w-full h-[1px] my-2 bg-slate-300'></div>

                            <div className='w-40 h-40 relative border-[1px]'>
                                <img className={``} src={product?.colorvariants[selectedColorVariant]?.thumbnail.url}></img>
                                <button onClick={() => { setShowThumbnailInputField(!showThumbnailInputField) }} className='absolute top-2 right-2 py-2 px-4 bg-green-300 rounded-md'>Edit</button>
                            </div>
                            {showThumbnailInputField &&
                                <div className='flex  gap-2'>
                                    <input onChange={e => onImageChange(e.target.files[0])} type="file" accept='image/*' placeholder='image' className="w-full p-1 border-[1px] rounded-sm border-black placeholder:p-2 "></input>
                                    <button onClick={() => { setShowImageInputField(!showImageInputField); updateThumbnailHandler(product?.colorvariants[selectedColorVariant]?.thumbnail.filename, product?.colorvariants[selectedColorVariant]?._id) }} className='py-2 px-4 bg-green-300 rounded-md'>Update</button>
                                </div>
                            }
                            <div className='w-full h-[1px] my-2 bg-slate-300'></div>
                            <p>Product images:</p>
                            <div className='w-full h-[1px] my-2 bg-slate-300'></div>
                            <div className='w-full h-full grid grid-col-2 gap-4 '>
                                {
                                    product?.colorvariants[selectedColorVariant].images.map((image) => {
                                        return <>
                                            <label htmlFor="image-upload" className='aspect-square w-full relative cursor-pointer border-2 border-red-400'>
                                                <img htmlFor="image-upload" src={image?.url} className='absolute w-full' />
                                                <input id='image-upload' type="file" name='file' onChange={() => updateImageHandler(image?.filename, image?._id)} accept="image/*" className='hidden' />
                                            </label>
                                            {/* <div className='relative border-[1px]'>
                                                <img className='' src={image?.url}></img>
                                                <button onClick={() => { setShowImageInputField(!showImageInputField) }} className='absolute top-2 right-2 py-2 px-4 bg-green-300 rounded-md'>Edit</button>
                                            </div> */}

                                            {/* todo: ui needs to be fixed */}
                                            {/* {showImageInputField &&
                                                <div>
                                                    <input onChange={e => onImageChange(e.target.files[0])} type="file" accept='image/*' placeholder='image' className="w-full p-1 border-[1px] rounded-sm border-black placeholder:p-2 "></input>
                                                    <button onClick={() => { setShowImageInputField(!showImageInputField); updateImageHandler(image?.filename, image?._id) }} className='py-2 px-4 bg-green-300 rounded-md'>Update</button>
                                                </div>
                                            } */}
                                        </>
                                    })
                                }
                                <div className='bg-slate-200 grid place-content-center'>
                                    <button onClick={() => { setShowAddImageInputField(!showAddImageInputField) }} className='py-2 px-6 text-4xl bg-green-500 '>+</button>
                                </div>

                            </div>
                            {
                                showAddImageInputField && <div className='w-full flex gap-2'>
                                    <input onChange={e => onImageChange(e.target.files[0])} type="file" accept='image/*' placeholder='image' className="w-full p-1 border-[1px] rounded-sm border-black placeholder:p-2 "></input>
                                    <button onClick={() => { setShowAddImageInputField(!showAddImageInputField); addImageHandler(product?.colorvariants[selectedColorVariant]._id) }} className='py-2 px-4 bg-green-300 rounded-md'>Add</button>
                                </div>
                            }
                            <div className='w-full h-[1px] my-2 bg-slate-300'></div>
                            <p>Size variants:</p>
                            <div className='w-full h-[1px] my-2 bg-slate-300'></div>
                            <div className='flex flex-col gap-2'>
                                {
                                    product?.colorvariants[selectedColorVariant].sizevariants.map((size) => {
                                        return <div key={size._id} className='flex flex-col justify-between gap-4 '>
                                            <div className="w-full flex flex-row gap-6 font-light ">
                                                <div className="w-full flex flex-row gap-2 font-light items-center">
                                                    <p>Name: {size.name}</p>|
                                                    <p>Stock: {size.stock}</p>|
                                                    <p>MRP: {size.mrp}</p>|
                                                    <p>Selling Price: {size.selling_price}</p>
                                                </div>
                                                {!showUpdateButton && (openedSizeEditForm === null) &&
                                                    <button onClick={() => { sizeVariantEditHandler(size._id) }} className='place-self-end py-2 px-4 bg-green-300 rounded-md'>Edit</button>
                                                }
                                            </div>

                                            {showUpdateButton && (openedSizeEditForm === size._id) &&
                                                <>
                                                    <div className='flex flex-row gap-2'>
                                                        <form className="w-full flex flex-col justify-between font-light ">
                                                            <div className='flex flex-row gap-2'>
                                                                <input onChange={(e) => onSizeChange(0, 'name', e.target.value)} name="name" type="text" placeholder='Name' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                                                                <select onChange={(e) => onSizeChange(0, 'status', e.target.value)} className='p-1 border-[1px] bg-white rounded-sm border-black w-full placeholder:p-2'>
                                                                    <option value='IN-STOCK' className=''> IN-STOCK</option>
                                                                    <option value='OUT-STOCK' className=''> OUT-STOCK</option>
                                                                </select>
                                                            </div>
                                                            <div className='flex flex-row gap-2'>
                                                                <input onChange={(e) => onSizeChange(0, 'stock', e.target.value)} name="stock" type="text" placeholder='Stock' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                                                                <input onChange={(e) => onSizeChange(0, 'mrp', e.target.value)} name="mrp" type="text" placeholder='Mrp' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                                                                <input onChange={(e) => onSizeChange(0, 'selling_price', e.target.value)} name="selling_price" type="text" placeholder='Selling Price' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                                                            </div>
                                                        </form>
                                                        <div className='aspect-square flex flex-col gap-2'>
                                                            <button onClick={() => { setOpenedSizeEditForm(null); setShowUpdateButton(false) }} className='w-full place-self-end py-2 px-4 bg-green-300 rounded-md'>Cancel</button>
                                                            <button onClick={() => { sizeVariantUpdateHandler(size._id) }} className='w-full place-self-end py-2 px-4 bg-green-300 rounded-md'>Update</button>
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                            <div className='w-full h-[1px] my-2 bg-slate-300'></div>
                                        </div>


                                    })
                                }
                            </div>
                            {(product?.colorvariants[selectedColorVariant].sizevariants.length < 7) &&
                                <>
                                    <AddSizeComponent />
                                </>
                            }
                        </>
                    }
                    {showColorVariantForm && (<AddColorVariant task={'EDIT'} product={product} handler={addColorVariantAndSizeVariantHandler} />)}
                    <div className='w-full h-[1px] my-2 bg-slate-300'></div>
                </div>
            </div>
        </div >
    )
}

export default EditProduct;


function AddSizeComponent() {

    const [sizeValues, setSizeValues] = useState(
        {
            name: '',
            status: 'IN-STOCK',
            stock: '',
            mrp: '',
            selling_price: '',
        },
    );

    const onSizeChange = (e) => {
        setSizeValues({
            ...sizeValues,
            [e.target.name]: e.target.value,
        })
    }

    let addSizeVariantHandler = () => {
        let data = {
            sizeVariant: sizeValues,
            colorVariantId: product?.colorvariants[selectedColorVariant]._id
        }
        if (product?.colorvariants[selectedColorVariant]._id) {
            dispatch(add_size_variant(data));
        }
        else {
            console.log('product id not found!!')
        }
    }
    return <div className='flex flex-col gap-2'>
        <p>Add Size: </p>
        <form className="w-full flex flex-col gap-4 font-light ">
            <div className='flex flex-row gap-2'>
                <input onChange={onSizeChange} name="name" type="text" placeholder='Name' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                <select onChange={onSizeChange} name="status" className='p-1 border-[1px] bg-white rounded-sm border-black w-full placeholder:p-2'>
                    <option value='IN-STOCK' className=''> IN-STOCK</option>
                    <option value='OUT-STOCK' className=''> OUT-STOCK</option>
                </select>
            </div>
            <div className='flex flex-row gap-2'>
                <input onChange={onSizeChange} name="stock" type="text" placeholder='Stock' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                <input onChange={onSizeChange} name="mrp" type="text" placeholder='Mrp' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                <input onChange={onSizeChange} name="selling_price" type="text" placeholder='Selling Price' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
            </div>
        </form>
        <button
            onClick={() => addSizeVariantHandler()}
            className="text-xl w-full h-10 aspect-square bg-green-400  text-white"
            type="button"
        >
            Add
        </button>
    </div>
}