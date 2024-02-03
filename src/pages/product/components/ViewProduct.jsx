import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { get_a_product } from '../../../store/slices/productSlice';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageCarousal from '../../../components/ImageCarousal';

function ViewProduct({ onComponentToggle, productId }) {

    const dispatch = useDispatch();
    const product = useSelector((state) => state.product.product);
    const [selectedColorVariant, setSelectedColorVariant] = useState(0);
    const [selectedSizeVariant, setSelectedSizeVariant] = useState(0);

    useEffect(() => {
        dispatch(get_a_product(productId))
    }, [])

    if (!product) return <></>;

    return (
        <>
            {!product && <></>}
            <div className='w-full p-6 grid place-content-center'>
                <div className='w-full flex flex-col'>
                    <div className='w-full place-self-center my-10 flex flex-col gap-4'>
                        <div className='flex flex-row justify-end'>
                            <FontAwesomeIcon className="text-3xl hover:scale-150 transition-all duration-300 ease-in-out " icon={faXmark} onClick={onComponentToggle} />
                        </div>
                        <div className='relative place-self-center md:w-9/12 w-full'>
                            <ImageCarousal images={product?.colorvariants[selectedColorVariant].images} />
                            <p className="absolute top-0 left-0  text-white px-1 w-40 h-40 text-center origin-center -rotate-45"><span className='bg-teal-300 px-4 py-2'>{product?.tag}</span></p>
                        </div>
                        <p className="py-1 rounded-sm w-full font-bold text-3xl">{product.name}</p>
                        <div className='flex flex-row gap-4 text-xl font-bold' >
                            <p className='line-through'>₹ {product?.colorvariants[selectedColorVariant].sizevariants[selectedSizeVariant].mrp}</p>
                            <p>₹ {product?.colorvariants[selectedColorVariant].sizevariants[selectedSizeVariant].selling_price}</p>
                        </div>
                        <p className='text-xl text-slate-500'>{product?.colorvariants[selectedColorVariant].sizevariants[selectedSizeVariant].stock} items remaining</p>
                        <div className='w-full flex flex-row gap-4'>
                            {product?.colorvariants?.map((item, index, arr) => {
                                return <img key={item._id} onClick={() => { setSelectedColorVariant(index); }} className={`w-10 h-10 my-4 rounded-full ${selectedColorVariant === index ? ` border-2 border-slate-500` : ``}`} src={arr[index]?.thumbnail.url}></img>
                            })}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p>SIZE</p>
                            <div className="w-full flex flex-row gap-2 font-light ">
                                {
                                    product?.colorvariants[selectedColorVariant].sizevariants.map((size, index, arr) => {
                                        return <div key={size._id} className={`w-12 h-8 bg-black grid place-content-center ${selectedSizeVariant === index ? 'border-4 border-slate-400' : ''}`}
                                            onClick={() => {
                                                setSelectedSizeVariant(index)
                                            }}
                                        >
                                            <p className='text-white text-xl font-light'>{size.name}</p>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        <p className="p-1  text-xl ">{product.description}</p>
                        <p className="p-1 text-slate-500">{product.keyword}</p>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ViewProduct;


