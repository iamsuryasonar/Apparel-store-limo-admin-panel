import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { add_category, get_all_categories, update_category } from '../store/slices/categorySlice';
import { useNavigate } from 'react-router-dom'

function CategoryPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector((state) => state.categories.categories);
    const [name, setName] = useState('');
    const [updatedName, setUpdatedName] = useState('');
    const [categoryStatus, setCategoryStatus] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isVisible, setVisible] = useState(false);

    const [image, setImage] = useState(null);
    const [updatedImage, setUpdatedImage] = useState('');

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
        dispatch(add_category({
            name: name,
            image: image,
        }));
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
    }

    useEffect(() => {
        dispatch(get_all_categories());
    }, [])

    return (
        <>
            <div className='w-full p-6'>
                <div className="w-full p-2 flex flex-col justify-center items-center border-[1px] border-black">
                    <p className='p-2 self-start text-xl font-semibold' >
                        Add Category
                    </p>
                    <div className='w-full h-[1px] bg-slate-400 m-2'></div>
                    <form className="w-full flex flex-col gap-6 font-light ">
                        <input onChange={onNameChange} name='name' type="text" placeholder='Name' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                        <input onChange={e => onImageChange(e.target.files[0])} name='image' type="file" accept='image/*' placeholder='image' className="w-full p-1 border-[1px] rounded-sm border-black placeholder:p-2 "></input>
                    </form>
                    <button
                        onClick={addCategoryHandler}
                        className="text-xl font-thin w-full my-4 h-10 aspect-square bg-slate-500  text-white"
                        type="button"
                    >
                        Add
                    </button>
                    <div className='w-full h-[1px] bg-slate-400'></div>
                    <p className='p-4 self-start text-xl font-semibold' >
                        Add Category
                    </p>
                    <div className='w-full h-[1px] bg-slate-400'></div>
                    <div className='w-full flex flex-col justify-between gap-2'>
                        {categories && categories.map((category) => {
                            return <div key={category._id} className='w-full p-2'>
                                <div className='grid grid-cols-4 gap-2 p-2'>
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
                                    <img src={category.bannerImage.url} className='w-24 h-24 aspect-square' />
                                    <button onClick={() => {
                                        setSelectedCategory(category);
                                        setVisible(!isVisible);
                                        setUpdatedName(category.name);
                                        setCategoryStatus(category.isActive)
                                    }} className='bg-slate-600 px-6 py-2 self-center text-white'>Edit</button>
                                </div>
                                {
                                    isVisible && (selectedCategory._id === category._id) && (
                                        <div>
                                            <div className='w-full h-[1px] bg-slate-400 my-2'></div>
                                            <div className='w-full'>
                                                <form className="w-full flex flex-col gap-6 font-light ">
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
                                                    className="text-xl font-thin w-full my-4 h-10 aspect-square bg-slate-500  text-white"
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
            </div>
        </>
    )
}


export default CategoryPage;

