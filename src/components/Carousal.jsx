import { useState } from 'react'

function Carousal({ images }) {

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevHandler = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    }

    const nextHandler = () => {
        if (currentIndex < images?.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0);
        }
    }

    return (
        <div className='m-8'>
            <div className='relative w-full aspect-square'>
                <button onClick={prevHandler} className='w-10 h-10 bg-green-400 rounded-full absolute top-1/2 bottom-1/2 left-0 -translate-x-1/2 -translate-y-1/2 grid place-content-center'><p className='p-0 m-0 text-white'>&lt;</p></button>
                <img className='w-full h-full object-cover rounded-sm aspect-square' src={images[currentIndex]?.url} />
                <button onClick={nextHandler} className='w-10 h-10 bg-green-400 rounded-full absolute top-1/2 bottom-1/2 right-0 translate-x-1/2 -translate-y-1/2 grid place-content-center'><p className='p-0 m-0 text-white'>&gt;</p></button>
                <div className='w-full absolute bottom-2 grid place-items-center'>
                    <div className='flex flex-row gap-2'>
                        {images?.map((_, index) => {
                            return <div key={index} className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-black' : 'bg-slate-300'}`}></div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Carousal;