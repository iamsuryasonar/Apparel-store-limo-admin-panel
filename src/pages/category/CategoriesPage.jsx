import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BottomAlert from '../../components/BottomAlert'
import { add_category, get_all_categories, update_category } from '../../store/slices/categorySlice';
import { setMessage, clearMessage } from '../../store/slices/messageSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

function CategoriesPage() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const message = useSelector((state) => state.message.message);
    const [name, setName] = useState('');
    const [updatedName, setUpdatedName] = useState('');
    const [categoryStatus, setCategoryStatus] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isVisible, setVisible] = useState(false);

    const [image, setImage] = useState(null);
    const [updatedImage, setUpdatedImage] = useState('');
    const [loadedImages, setLoadedImages] = useState([]);
    const inputFileRef = useRef(null);

    const onNameChange = (e) => {
        setName(e.target.value)
    }

    const onUpdatedNameChange = (e) => {
        setUpdatedName(e.target.value)
    }
    const onUpdatedImageChange = (file) => {
        setUpdatedImage(file)
    }

    const onImageChange = (file) => {
        setImage(file)
    }

    let addCategoryHandler = () => {
        if (!name) {
            dispatch(setMessage('Category name required!'));
            setTimeout(() => {
                dispatch(clearMessage());
            }, 3000);
            return;
        }
        if (!image) {
            dispatch(setMessage('Category Image required!'));
            setTimeout(() => {
                dispatch(clearMessage());
            }, 3000);
            return;
        }

        dispatch(add_category({
            name: name,
            image: image,
        }));
        clearFileInput()
    }


    let updateCategoryHandler = () => {
        const data = {
            id: selectedCategory._id,
            name: updatedName,
            image: updatedImage,
            path: selectedCategory.bannerImage.filename,
            isActive: categoryStatus,
        }

        dispatch(update_category(data));
        clearFileInput()
    }


    const handleImageLoad = (index) => {
        setLoadedImages((prevLoadedImages) => [...prevLoadedImages, index]);
    };


    useEffect(() => {
        dispatch(get_all_categories())
    }, [])

    const clearFileInput = () => {
        setName('');
        setImage(null);
        if (inputFileRef.current) {
            inputFileRef.current.value = ''; // Reset the input value to empty
        }
    };

    return (
        <>
            {message && <BottomAlert message={message} />}
            <div className='w-full'>
                <div className="w-full p-2 flex flex-col justify-center items-center border-[1px] border-black">
                    <p className='p-2 self-start text-xl font-semibold' >
                        Add Category
                    </p>
                    <div className='w-full h-[1px] bg-slate-400 m-2'></div>
                    <form className="w-full flex flex-col gap-6 font-light ">
                        <input onChange={onNameChange} value={name} name='name' type="text" placeholder='Name' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                        <input onChange={e => onImageChange(e.target.files[0])} ref={inputFileRef} name='image' type="file" accept='image/*' placeholder='image' className="w-full p-1 border-[1px] rounded-sm border-black placeholder:p-2 "></input>
                    </form>
                    <button
                        onClick={addCategoryHandler}
                        className="text-xl font-light w-full my-4 h-10 aspect-square  bg-slate-600 hover:bg-black text-white  active:bg-black"
                        type="button"
                    >
                        Add
                    </button>
                    <div className='w-full h-[1px] bg-slate-400'></div>
                    <p className='p-4 self-start text-xl font-semibold' >
                        All Category
                    </p>
                    <div className='w-full flex flex-col justify-between gap-2'>
                        {categories && categories.map((category, index, _) => {
                            return <div key={category._id} className='w-full p-2 '>
                                <div className='grid grid-cols-2 md:grid-cols-4 gap-2 p-2'>
                                    <p className='self-center'>
                                        {category.name}
                                    </p>
                                    <div className='self-center'>
                                        {
                                            category.isActive ?
                                                <p className='text-green-400'>ACTIVE</p>
                                                :
                                                < p className='text-red-400'>IN-ACTIVE</p>
                                        }
                                    </div>
                                    <div className={`w-24 h-24 ${loadedImages.includes(index) ? 'animate-none' : 'bg-slate-100 animate-pulse'} `}>
                                        <img src={category.bannerImage.url} className='aspect-square' onLoad={() => handleImageLoad(index)} />
                                    </div>
                                    <button onClick={() => {
                                        setSelectedCategory(category);
                                        setVisible(!isVisible);
                                        setUpdatedName(category.name);
                                        setCategoryStatus(category.isActive)
                                    }} className='px-6 py-2 self-center bg-slate-600 hover:bg-black text-white  active:bg-black'>{isVisible && (selectedCategory._id === category._id) ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}</button>
                                </div>
                                {
                                    isVisible && (selectedCategory._id === category._id) && (
                                        <div>
                                            <div className='w-full h-[1px] bg-slate-400 my-2'></div>
                                            <div className='w-full'>
                                                <form className="w-full flex flex-col gap-6 font-light">
                                                    <input onChange={onUpdatedNameChange} value={updatedName} name='name' type="text" placeholder='Name' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                                                    <input onChange={e => onUpdatedImageChange(e.target.files[0])} name='image' type="file" accept='image/*' placeholder='image' className="w-full p-1 border-[1px] rounded-sm border-black placeholder:p-2 "></input>
                                                    <select onChange={(e) => { setCategoryStatus(e.target.value) }} value={categoryStatus} className='p-1 border-[1px] bg-white rounded-sm border-black w-full placeholder:p-2'>
                                                        <option value='true' className=''> ACTIVE</option>
                                                        <option value='false' className=''> IN-ACTIVE</option>
                                                    </select>
                                                </form>
                                                <button
                                                    onClick={() => {
                                                        updateCategoryHandler(category._id)
                                                    }}
                                                    className="text-xl font-thin w-full my-4 h-10 aspect-square bg-slate-600 hover:bg-black text-white  active:bg-black"
                                                    type="button"
                                                >
                                                    Update
                                                </button>
                                            </div>
                                            <div className='w-full h-[1px] bg-slate-400 my-2'></div>
                                        </div>
                                    )
                                }
                            </div>
                        })}
                    </div>


                </div>
            </div >
        </>
    )
}


export default CategoriesPage;

