//? since AddProductPage page and EditProduct Component both require same form to be filled 
//? this Component created. Task ('ADD' or 'EDIT') prop tells this component, which handler to call upon submission of the form

import { useState } from 'react'

function AddColorVariant({ task, product, handler }) {
    const [colorVariantValues, setColorVariantValues] = useState(
        {
            name: '',
            thumbnail: ''
        },
    );

    const [imageValues, setImageValues] = useState([]);

    const [sizeValues, setSizeValues] = useState([
        {
            name: '',
            status: 'IN-STOCK',
            stock: '',
            mrp: '',
            selling_price: '',
        },
    ]);

    const onColorVariantChange = (e) => {
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

    let addImageField = () => {
        setImageValues([...imageValues, { image: "" }]);
    };

    let removeImageField = (index) => {
        let newImageValues = [...imageValues];
        newImageValues.splice(index, 1);
        setImageValues(newImageValues);
    };

    let onImagesChange = (index, file) => {
        let newImageValues = [...imageValues];
        newImageValues.splice(index, 1, { image: file });
        setImageValues(newImageValues);
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

    const removeSizeForm = (index) => {
        setSizeValues((prevSizeValues) => {
            const newSizeValues = [...prevSizeValues];
            newSizeValues.splice(index, 1);
            return newSizeValues;
        });
    };

    const onSizeChange = (index, fieldName, value) => {
        setSizeValues((prevSizeValues) => {
            const newSizeValues = [...prevSizeValues];
            newSizeValues[index] = { ...newSizeValues[index], [fieldName]: value };
            return newSizeValues;
        });
    };

    const addOrEditHandler = () => {
        if (task === 'ADD') {
            handler(product, colorVariantValues, imageValues, sizeValues)
        }

        if (task === 'EDIT') {
            handler(product.id, colorVariantValues, imageValues, sizeValues)
        }
    }

    return <>
        {
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
                                        <input onChange={e => onImagesChange(index, e.target.files[0])} type="file" accept='image/*' placeholder='image' className="w-full p-1 border-[1px] rounded-sm border-black placeholder:p-2 "></input>
                                        {imageValues.length !== 1 && (
                                            <button
                                                onClick={() => removeImageField(index)}
                                                className=" text-2xl w-10 aspect-square rounded-full bg-slate-300 text-black hover:bg-slate-600 hover:text-white active:bg-slate-600 active:text-white"
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
                                className="text-2xl w-full h-10 aspect-square bg-slate-300 text-black hover:bg-slate-600 hover:text-white active:bg-slate-600 active:text-white"
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
                                className="text-2xl w-full h-10 aspect-square bg-slate-300 text-black hover:bg-slate-600 hover:text-white active:bg-slate-600 active:text-white"
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
                                        className="text-2xl w-full h-10 aspect-square bg-slate-300 text-black hover:bg-slate-600 hover:text-white active:bg-slate-600 active:text-white"
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
                                onClick={addOrEditHandler}
                                className="text-xl font-light w-full my-4 h-10 aspect-square bg-slate-600 hover:bg-black text-white  active:bg-black"
                                type="button"
                            >
                                Submit variant
                            </button>
                        )
                    }
                </div>
            </div>
        }
    </>
}

export default AddColorVariant;