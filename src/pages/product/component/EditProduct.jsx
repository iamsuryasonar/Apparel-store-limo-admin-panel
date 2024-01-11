import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleIsPublished, add_color_and_its_size_variant, update_product_info, add_size_variant, update_size_variant, update_thumbnail, update_image, add_image, get_a_product } from '../../../store/slices/productSlice';
import { faXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddColorVariant from './AddColorVariant'

function EditProduct({ onEditToggle, categories, productId }) {

    const dispatch = useDispatch();
    const product = useSelector((state) => state.product.product);
    const [showColorVariant, setShowColorVariant] = useState(true);
    const [showColorVariantForm, setShowColorVariantForm] = useState(false)
    const [showUpdateButton, setShowUpdateButton] = useState(false)
    const [selectedColorVariant, setSelectedColorVariant] = useState(0);
    const [openedSizeEditForm, setOpenedSizeEditForm] = useState(null)
    const [productValues, setProductValues] = useState(
        {
            name: '',
            description: '',
            keyword: '',
            tag: '',
            category: '',
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

    useEffect(() => {
        if (product) {
            setProductValues(
                {
                    name: product?.name,
                    description: product?.description,
                    keyword: product?.keyword,
                    tag: product?.tag,
                    category: product?.category,
                },
            )
        }

    }, [product])

    useEffect(() => {
        dispatch(get_a_product(productId))
    }, [])

    const onProductChange = (e) => {
        setProductValues({
            ...productValues,
            [e.target.name]: e.target.value,
        })
    }

    const toggleIsPublishHandler = () => {
        if (product) dispatch(toggleIsPublished(product?._id));
    }

    const onSizeChange = (e) => {
        setSizeValues({
            ...sizeValues,
            [e.target.name]: e.target.value,
        })
    }

    const sizeVariantEditHandler = (index, id) => {
        let size = product?.colorvariants[selectedColorVariant].sizevariants[index]
        setSizeValues({
            name: size?.name,
            status: size?.status,
            stock: size?.stock,
            mrp: size?.mrp,
            selling_price: size?.selling_price,
        },)

        setOpenedSizeEditForm(id)
        setShowUpdateButton(!showUpdateButton)
    }

    const addImageHandler = (colorVariantId, file) => {
        if (colorVariantId) {
            dispatch(add_image({ colorVariantId, image: file, productId }));
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
            productId
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

    const updateThumbnailHandler = (thumbnailPath, colorVariantId, file) => {
        if (thumbnailPath) {
            dispatch(update_thumbnail({ thumbnailPath, colorVariantId, image: file, productId }));
        }
    }
    const updateImageHandler = (path, imageId, file) => {
        console.log(path, imageId, file)
        if (path) {
            dispatch(update_image({ path, imageId, image: file, productId }));
        }
    }

    return (
        <>
            {!product && <></>}
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
                            <div className='w-full flex flex-row justify-between '>
                                <button onClick={toggleIsPublishHandler} className='place-self-end py-2 px-4 bg-green-300 rounded-md'>{product?.isPublished ? 'Unpublish' : 'Publish'}</button>
                                <button onClick={updateProductInfoHandler} className='place-self-end py-2 px-4 bg-green-300 rounded-md'>Update</button>
                            </div>
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
                                <label htmlFor="thumbnail-update" className='relative cursor-pointer'>
                                    <img htmlFor="thumbnail-update" src={product?.colorvariants[selectedColorVariant]?.thumbnail.url} className='absolute w-40 h-40' />
                                    <input id='thumbnail-update' type="file" onChange={(e) => updateThumbnailHandler(product?.colorvariants[selectedColorVariant]?.thumbnail.filename, product?.colorvariants[selectedColorVariant]?._id, e.target.files[0])} accept="image/*" className='hidden' />
                                    <div className='w-40 h-40 grid bg-black opacity-0 hover:opacity-20 text-white place-content-center text-5xl'><FontAwesomeIcon icon={faPenToSquare} /></div>
                                </label>

                                <div className='w-full h-[1px] my-2 bg-slate-300'></div>
                                <p>Product images:</p>
                                <div className='w-full h-[1px] my-2 bg-slate-300'></div>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
                                    {
                                        product?.colorvariants[selectedColorVariant].images.map((image) => {
                                            return (
                                                <label htmlFor={image._id} key={image._id} className='aspect-square relative cursor-pointer'>
                                                    <img htmlFor={image._id} src={image?.url} className='absolute  inset-0' />
                                                    <input id={image._id} type="file" onChange={(e) => updateImageHandler(image?.filename, image?._id, e.target.files[0])} accept="image/*" className='hidden' />
                                                    <div className='w-full h-full grid bg-black opacity-0 hover:opacity-20 text-white place-content-center text-5xl'><FontAwesomeIcon icon={faPenToSquare} /></div>
                                                </label>
                                            )
                                        })
                                    }
                                    {
                                        product?.colorvariants[selectedColorVariant].images.length < 4 && (
                                            <label htmlFor="image-upload" className='aspect-square relative cursor-pointer bg-slate-100 hover:bg-slate-300 grid'>
                                                <p htmlFor="image-upload" className='absolute place-self-center text-5xl text-black hover:text-green-500'>+</p>
                                                <input id='image-upload' type="file" onChange={(e) => addImageHandler(product?.colorvariants[selectedColorVariant]._id, e.target.files[0])} accept="image/*" className='hidden' />
                                            </label>
                                        )
                                    }
                                </div>
                                <div className='w-full h-[1px] my-2 bg-slate-300'></div>
                                <p>Size variants:</p>
                                <div className='w-full h-[1px] my-2 bg-slate-300'></div>
                                <div className='flex flex-col gap-2'>
                                    {
                                        product?.colorvariants[selectedColorVariant].sizevariants.map((size, index, arr) => {
                                            return <div key={size._id} className='flex flex-col justify-between gap-4 '>
                                                <div className="w-full flex flex-row gap-6 font-light ">
                                                    <div className="w-full flex flex-row gap-2 font-light items-center">
                                                        <p>Name: {size.name}</p>|
                                                        <p>Stock: {size.stock}</p>|
                                                        <p>MRP: {size.mrp}</p>|
                                                        <p>Selling Price: {size.selling_price}</p>
                                                    </div>
                                                    {!showUpdateButton && (openedSizeEditForm === null) &&
                                                        <button onClick={() => { sizeVariantEditHandler(index, size._id) }} className='place-self-end py-2 px-4 bg-green-300 rounded-md'>Edit</button>
                                                    }
                                                </div>

                                                {showUpdateButton && (openedSizeEditForm === size._id) &&
                                                    <>
                                                        <div className='flex flex-row gap-2'>
                                                            <form className="w-full flex flex-col justify-between font-light ">
                                                                <div className='flex flex-row gap-2'>
                                                                    <input onChange={(e) => onSizeChange(0, 'name', e.target.value)} value={sizeValues.name} name="name" type="text" placeholder='Name' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                                                                    <select onChange={(e) => onSizeChange(0, 'status', e.target.value)} value={sizeValues.status} className='p-1 border-[1px] bg-white rounded-sm border-black w-full placeholder:p-2'>
                                                                        <option value='IN-STOCK' className=''> IN-STOCK</option>
                                                                        <option value='OUT-STOCK' className=''> OUT-STOCK</option>
                                                                    </select>
                                                                </div>
                                                                <div className='flex flex-row gap-2'>
                                                                    <input onChange={(e) => onSizeChange(0, 'stock', e.target.value)} value={sizeValues.stock} name="stock" type="text" placeholder='Stock' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                                                                    <input onChange={(e) => onSizeChange(0, 'mrp', e.target.value)} value={sizeValues.mrp} name="mrp" type="text" placeholder='Mrp' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                                                                    <input onChange={(e) => onSizeChange(0, 'selling_price', e.target.value)} value={sizeValues.selling_price} name="selling_price" type="text" placeholder='Selling Price' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
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
        </>
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



