import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { add_color_and_its_size_variant, update_product_info, add_size_variant, update_size_variant } from '../../../store/slices/productSlice';
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function EditProduct({ onEditToggle, product, categories }) {

    const dispatch = useDispatch();
    const [imageValues, setImageValues] = useState([]);
    const [selectedColorVariant, setSelectedColorVariant] = useState(0);
    const [showColorVariant, setShowColorVariant] = useState(true);
    const [showColorVariantForm, setShowColorVariantForm] = useState(false)

    const [sizeValues, setSizeValues] = useState([
        {
            name: '',
            status: 'IN-STOCK',
            stock: '',
            mrp: '',
            selling_price: '',
        },
    ]);

    const [productValues, setProductValues] = useState(
        {
            name: product?.name || '',
            description: product?.description || '',
            keyword: product?.keyword || '',
            tag: product?.tag || '',
            category: product?.category || '',
        },
    );

    const [colorVariantValues, setColorVariantValues] = useState(
        {
            name: '',
            thumbnail: ''
        },
    );

    const [variantFormIsVisible, setTogleVariantForm] = useState(false);

    const onColorVariantChange = (e) => {
        console.log(e.target.name);
        if (e.target.name === 'name') {
            setColorVariantValues({
                ...colorVariantValues,
                ['name']: e.target.value,
            })
        } else {
            setColorVariantValues({
                ...colorVariantValues,
                ['thumbnail']: e.target.files[0],
            })
        }

    }

    const onProductChange = (e) => {
        setProductValues({
            ...productValues,
            [e.target.name]: e.target.value,
        })
    }


    const removeSizeForm = (index) => {
        setSizeValues((prevSizeValues) => {
            const newSizeValues = [...prevSizeValues];
            newSizeValues.splice(index, 1);
            return newSizeValues;
        });
    };

    const addSizeForm = () => {
        setSizeValues((prevSizeValues) => [
            ...prevSizeValues,
            {
                name: '',
                status: 'IN-STOCK',
                stock: '',
                mrp: '',
                selling_price: '',
            },
        ]);
    };

    const onSizeChange = (index, fieldName, value) => {
        setSizeValues((prevSizeValues) => {
            const newSizeValues = [...prevSizeValues];
            newSizeValues[index] = { ...newSizeValues[index], [fieldName]: value };
            return newSizeValues;
        });
    };

    let addImageField = () => {
        setImageValues([...imageValues, { image: "" }]);
    };

    let removeImageField = (index) => {
        let newImageValues = [...imageValues];
        newImageValues.splice(index, 1);
        setImageValues(newImageValues);
    };

    let onImageChange = (index, file) => {
        let newImageValues = [...imageValues];
        newImageValues.splice(index, 1, { image: file });
        setImageValues(newImageValues);
    };

    let addColorVariantAndSizeVariantHandler = () => {
        if (product?.id) {
            let body = {
                productId: product?.id,
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
    let addSizeVariantHandler = () => {
        let data = {
            sizeVariant: sizeValues[0],
            colorVariantId: product?.colorvariants[selectedColorVariant]._id
        }
        if (product?.colorvariants[selectedColorVariant]._id) {
            dispatch(add_size_variant(data));
        }
        else {
            console.log('product id not found!!')
        }
    }
    const [showUpdateButton, setShowUpdateButton] = useState(false)
    const [openedSizeEditForm, setOpenedSizeEditForm] = useState(null)

    const sizeVariantEditHandler = (id) => {
        setOpenedSizeEditForm(id)
        setShowUpdateButton(!showUpdateButton)
    }

    const sizeVariantUpdateHandler = (id) => {
        let data = {
            sizeVariant: sizeValues[0],
            sizeVariantId: id,
        }
        if (id) {
            dispatch(update_size_variant(data));
        }
        else {
            console.log('product id not found!!')
        }

    }
    //todo: thumbnail and image update, need to be implemented...

    //todo: put it to common folder ... might remove this, and use image url instead 
    function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    return (
        <div className='w-full p-6 flex justify-center items-center'>
            <div className=' relative max-w-4xl w-full my-10 gap-4'>
                <FontAwesomeIcon className="text-3xl absolute top-7 right-10 hover:scale-150 transition-all duration-300 ease-in-out " icon={faXmark} onClick={onEditToggle} />
                <div className='w-full flex flex-col'>
                    <div className='  w-full place-self-center my-10 '>
                        <div className="w-full p-2 md:p-0 flex flex-col justify-center items-center border-[1px] border-black ">
                            <form className="w-full m-2  flex flex-col gap-6 font-light ">
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
                        <p className='self-start underline underline-offset-8' >Color Variant:</p>

                        {/* color variants list */}
                        <div className='w-full flex flex-row gap-4'>
                            {product?.colorvariants?.map((item, index, arr) => {
                                return <img key={item._id} onClick={() => { setSelectedColorVariant(index); setShowColorVariant(true); setShowColorVariantForm(false); }} className={`w-10 h-10 my-4 rounded-full ${selectedColorVariant === index ? ` border-4 border-black` : ``}`} src={`data:image/webp;base64,${arrayBufferToBase64(arr[index].thumbnail?.data?.data)}`}></img>
                            })}
                            <div onClick={() => { setShowColorVariantForm(true); setShowColorVariant(false) }} className='w-10 h-10 my-4 rounded-full  border-4 border-slate-400 text-4xl flex justify-center items-center'>+</div>
                        </div>
                        {/* when clicked on color image above this becomes visible */}
                        {showColorVariant &&
                            <>
                                <p>Color thumbnail:</p>
                                <div className='relative '>
                                    <img className={`w-40 h-40 my-4`} src={`data:image/webp;base64,${arrayBufferToBase64(product?.colorvariants[selectedColorVariant].thumbnail?.data?.data)}`}></img>
                                    <button className='absolute top-2 right-2 py-2 px-4 bg-green-300 rounded-md'>Update</button>
                                </div>
                                <p>Product images:</p>
                                <div className='grid grid-cols-4 '>
                                    {
                                        product?.colorvariants[selectedColorVariant].images.map((image) => {
                                            return <>
                                                <div className='relative w-full'>
                                                    <img className='w-40 h-40 my-4' src={`data:image/webp;base64,${arrayBufferToBase64(image?.data?.data)}`}></img>
                                                    <button className='absolute top-2 right-2 py-2 px-4 bg-green-300 rounded-md'>Update</button>
                                                </div>
                                            </>
                                        })
                                    }
                                </div>
                                <p>Size variants:</p>
                                <div className='w-full h-[1px] my-2 bg-slate-300'></div>
                                <div className='flex flex-col gap-4'>
                                    {
                                        product?.colorvariants[selectedColorVariant].sizevariants.map((size) => {
                                            return <div key={size._id} className='flex flex-col gap-4 '>
                                                <div className="w-full flex flex-row gap-6 font-light ">
                                                    <p>{size.name} </p>
                                                    <p>{size.stock}</p>
                                                    <p>{size.mrp}</p>
                                                    <p>{size.selling_price}</p>
                                                </div>

                                                {!showUpdateButton && (openedSizeEditForm === null) &&
                                                    <button onClick={() => { sizeVariantEditHandler(size._id) }} className='place-self-end py-2 px-4 bg-green-300 rounded-md'>Edit</button>
                                                }
                                                {showUpdateButton && (openedSizeEditForm === size._id) &&
                                                    <>
                                                        <div className='flex flex-row gap-2'>
                                                            <form className="w-full flex flex-col gap-6 font-light ">
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
                                                            <div className='flex flex-col gap-2'>
                                                                <button onClick={() => { setOpenedSizeEditForm(null); setShowUpdateButton(false) }} className='place-self-end py-2 px-4 bg-green-300 rounded-md'>Cancel</button>
                                                                <button onClick={() => { sizeVariantUpdateHandler(size._id) }} className='place-self-end py-2 px-4 bg-green-300 rounded-md'>Update</button>
                                                            </div>
                                                        </div>
                                                    </>
                                                }
                                                <div className='w-full h-[1px] my-2 bg-slate-300'></div>
                                            </div>

                                        })
                                    }
                                    {(product?.colorvariants[selectedColorVariant].sizevariants.length < 7) &&
                                        <>
                                            <form className="w-full flex flex-col gap-6 font-light ">
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
                                            <button
                                                onClick={() => addSizeVariantHandler()}
                                                className="text-2xl w-full h-10 aspect-square bg-green-400  text-white"
                                                type="button"
                                            >
                                                +
                                            </button>
                                        </>
                                    }
                                </div>
                            </>
                        }
                        {/* color variants form */}
                        {
                            showColorVariantForm && (
                                <div className='w-full '>
                                    <div className='w-full my-2 h-[1px] bg-slate-300'></div>
                                    <p className='self-start underline underline-offset-8' >Color Variant:</p>
                                    <form className="w-full flex flex-col gap-4 font-light ">
                                        <input onChange={onColorVariantChange} name='name' type="text" placeholder='Name' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                                        <div>
                                            <span>Thumbnail:</span>
                                            <input onChange={onColorVariantChange} name='thumbnail' type="file" accept='image/*' placeholder='Thumbnail' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                                        </div>
                                        <div className=' flex flex-col justify-between items-start gap-2 '>
                                            <div className='w-full '>
                                                <span>Images:</span>
                                                <div className='w-full flex flex-col justify-between gap-2'>
                                                    {imageValues.map((element, index) => (
                                                        <div className=" flex justify-between gap-2" key={index}>
                                                            <input onChange={e => onImageChange(index, e.target.files[0])} type="file" accept='image/*' placeholder='image' className="w-full p-1 border-[1px] rounded-sm border-black placeholder:p-2 "></input>
                                                            {imageValues.length !== 1 && (
                                                                <button
                                                                    onClick={() => removeImageField(index)}
                                                                    className=" text-2xl w-10 aspect-square bg-slate-500 rounded-full text-white"
                                                                    type="button"
                                                                >
                                                                    -
                                                                </button>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            {imageValues.length < 4 && (
                                                <button
                                                    onClick={() => addImageField()}
                                                    className="text-2xl w-full h-10 aspect-square bg-slate-500  text-white"
                                                    type="button"
                                                >
                                                    +
                                                </button>
                                            )}
                                        </div>
                                    </form>
                                    <div className='w-full h-[1px] my-2 bg-slate-300'></div>
                                    {/* size variants form */}
                                    <div className='w-full flex flex-col justify-start'>
                                        <div className='flex flex-row gap-4 items-center justify-between'>
                                            <p className='w-full'>Size Variants</p>
                                            {sizeValues.length <= 5 && (
                                                <button
                                                    onClick={() => addSizeForm()}
                                                    className="text-2xl w-full h-10 aspect-square bg-slate-500  text-white"
                                                    type="button"
                                                >
                                                    +
                                                </button>
                                            )}
                                        </div>
                                        {sizeValues.map((element, index) => (
                                            <div key={index} className='w-full '>
                                                <div className='w-full h-[1px] my-2 bg-slate-300'></div>
                                                <form className="w-full flex flex-col gap-6 font-light ">
                                                    <div className='flex flex-row gap-2'>
                                                        <input onChange={(e) => onSizeChange(index, 'name', e.target.value)} name="name" type="text" placeholder='Name' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                                                        <select onChange={(e) => onSizeChange(index, 'status', e.target.value)} className='p-1 border-[1px] bg-white rounded-sm border-black w-full placeholder:p-2'>
                                                            <option value='IN-STOCK' className=''> IN-STOCK</option>
                                                            <option value='OUT-STOCK' className=''> OUT-STOCK</option>
                                                        </select>
                                                    </div>
                                                    <div className='flex flex-row gap-2'>
                                                        <input onChange={(e) => onSizeChange(index, 'stock', e.target.value)} name="stock" type="text" placeholder='Stock' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                                                        <input onChange={(e) => onSizeChange(index, 'mrp', e.target.value)} name="mrp" type="text" placeholder='Mrp' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                                                        <input onChange={(e) => onSizeChange(index, 'selling_price', e.target.value)} name="selling_price" type="text" placeholder='Selling Price' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                                                    </div>
                                                    {sizeValues.length !== 1 && (
                                                        <button
                                                            onClick={() => removeSizeForm(index)}
                                                            className="text-2xl w-full h-10 aspect-square bg-slate-500  text-white"
                                                            type="button"
                                                        >
                                                            -
                                                        </button>
                                                    )}
                                                </form>
                                            </div>
                                        ))}
                                        {
                                            sizeValues.length >= 1 && (
                                                <button
                                                    onClick={addColorVariantAndSizeVariantHandler}
                                                    className="text-xl font-thin w-full my-4 h-10 aspect-square bg-slate-500  text-white"
                                                    type="button"
                                                >
                                                    Submit variant
                                                </button>
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        }
                        <div className='w-full h-[1px] my-2 bg-slate-300'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProduct;