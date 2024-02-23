import { useState, useRef } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from '../components/LoadingSpinner'


function ImageCarousal({ images }) {
    const [currentImage, setCurrentImage] = useState(0);
    const [loadedImages, setLoadedImages] = useState([]);

    const containerRef = useRef(null);
    const [startX, setStartX] = useState(null);
    const [swipeType, setSwipeType] = useState('');

    // carousal handlers
    const nextImageHandler = () => {
        if (currentImage < images.length - 1) {
            setCurrentImage(currentImage + 1);
        }
    }

    const prevImageHandler = () => {
        if (currentImage > 0) {
            setCurrentImage(currentImage - 1);
        }
    }
    const handleImageLoad = (index) => {
        setLoadedImages((prevLoadedImages) => [...prevLoadedImages, index]);
    };

    //swipe handlers
    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        if (startX === null) return;
        const currentX = e.touches[0].clientX;
        const diffX = currentX - startX;

        if (diffX > 0) {
            setSwipeType('RIGHT')
        } else if (diffX < 0) {
            setSwipeType('LEFT')
        }
    };

    const handleTouchEnd = (e) => {
        setStartX(null);
        if (swipeType === 'RIGHT') {
            prevImageHandler()
        } else if (swipeType === 'LEFT') {
            nextImageHandler()
        }
        setSwipeType('');
    };

    return <>
        <div className='aspect-square relative'
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <img src={images[currentImage].url} className='object-cover w-full h-full' onLoad={() => handleImageLoad(currentImage)} />
            <div className='absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2'>
                {!loadedImages.includes(currentImage) ? <LoadingSpinner /> : <></>}
            </div>
            <button className=' active:text-teal-500 text-white text-3xl w-8 h-8 absolute top-1/2 bottom-1/2 left-1 -translate-y-1/2 flex items-center justify-center'
                onClick={prevImageHandler}
            >
                <FontAwesomeIcon icon={faCircleChevronLeft} />
            </button>
            <button className=' active:text-teal-500 text-white text-3xl w-8 h-8 absolute top-1/2 bottom-1/2 right-1 -translate-y-1/2 flex items-center justify-center'
                onClick={nextImageHandler}
            >
                <FontAwesomeIcon icon={faCircleChevronRight} />
            </button>
        </div >
        <div className='w-full flex flex-row gap-2 mt-4 justify-end'>
            {images.map((item, index) => {
                return <img key={item._id} src={item.url} className={`w-1/6 object-cover aspect-square ${currentImage === index ? 'border-2 border-slate-500' : ''}`}
                    onClick={() => {
                        setCurrentImage(index)
                    }}
                />
            })}
        </div>
    </>
}

export default ImageCarousal;