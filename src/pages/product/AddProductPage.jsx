import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function AddProductPage() {
    const [imageValues, setImageValues] = useState([]);
    const [sizeValues, setSizeValues] = useState([]);
    const [variantFormIsVisible, setTogleVariantForm] = useState(false);

    let addSizeForm = () => {
        setSizeValues([...sizeValues, { image: "" }]);
    };

    let removeSizeForm = (index) => {
        let newSizeValues = [...sizeValues];
        newSizeValues.splice(index, 1);
        setSizeValues(newSizeValues);
    };

    let addImageField = () => {
        setImageValues([...imageValues, { image: "" }]);
    };

    let removeImageField = (index) => {
        let newImageValues = [...imageValues];
        newImageValues.splice(index, 1);
        setImageValues(newImageValues);
    };

    return (
        <div className='w-full place-self-center my-10 '>
            <div className="w-full p-2 md:p-0 flex flex-col md:flex-row justify-center items-center border-[1px] border-black ">
                <form className="w-full m-2  flex flex-col gap-6 font-light ">
                    <input type="text" placeholder='Name' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                    <input type="text" placeholder='Description' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                    <input type="password" placeholder='Keyword' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                    <select className='p-1 border-[1px] bg-white rounded-sm border-black w-full placeholder:p-2  drop-shadow-sm'>
                        <option className=''> Category 1</option>
                        <option className=''> Category 1</option>
                        <option className=''> Category 1</option>
                        <option className=''> Category 1</option>
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

            {
                variantFormIsVisible && (
                    <div className='w-full '>
                        <div className='w-full my-2 h-[1px] bg-slate-300'></div>
                        <p className='self-start underline underline-offset-8' >Color Variant:</p>
                        <form className="w-full flex flex-col gap-4 font-light ">
                            <input type="text" placeholder='Name' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                            <div>
                                <span>Thumbnail:</span>
                                <input type="file" accept='image/*' placeholder='Thumpnail' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                            </div>
                            <div className=' flex flex-col justify-between items-start gap-2 '>
                                <div className='w-full '>
                                    <span>Images:</span>
                                    <div className='w-full flex flex-col justify-between gap-2'>
                                        {imageValues.map((element, index) => (
                                            <div className=" flex justify-between gap-2" key={index}>
                                                <input type="file" accept='image/*' placeholder='image' className="w-full p-1 border-[1px] rounded-sm border-black placeholder:p-2 "></input>
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
                                            <input type="text" placeholder='Name' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                                            <select className='p-1 border-[1px] bg-white rounded-sm border-black w-full placeholder:p-2'>
                                                <option className=''> IN-STOCK</option>
                                                <option className=''> OUT-STOCK</option>
                                            </select>
                                        </div>
                                        <div className='flex flex-row gap-2'>
                                            <input type="text" placeholder='Stock' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                                            <input type="text" placeholder='Mrp' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                                            <input type="text" placeholder='Selling Price' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
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
                                        onClick={() => removeSizeForm(index)}
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
    )
}
export default AddProductPage;