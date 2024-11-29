import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping, faBoxOpen, faBoxesStacked, faTruck, faTruckRampBox, faRotateLeft
} from '@fortawesome/free-solid-svg-icons'

const Widget = ({ numbers, title, icon }) => {
    return (
        <div className='bg-slate-200 p-4 rounded-lg '>
            <div className='flex justify-between'>
                <h1>{title}</h1>
            </div>
            <div className='flex justify-between my-4'>
                <div className='w-8 h-8 bg-slate-500 rounded-full grid'><FontAwesomeIcon className='place-self-center text-white' icon={icon} /></div>
                <p>{numbers}</p>
            </div>
            {/* <Link to='/' className='underline underline-offset-4 text-blue-400 hover:text-blue-600'>View more...</Link> */}
        </div>
    )
}

export default Widget;