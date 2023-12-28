import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMagnifyingGlass, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function Nav() {
    return (
        <div className=" bg-slate-100 p-6 flex justify-between">
            <div className='flex gap-5 uppercase'>
                {/* <Link to='/' className="hover:underline">Home</Link> */}
                {/* <Link to='/shop' className="hover:underline">Shop</Link>
                <Link to='/contact-us' className="hover:underline">Contact</Link> */}
            </div>
            <h1>LIMO</h1>
            <div className='flex gap-5'>
                {/* <Link to='/sign-in' className="hover:underline"><FontAwesomeIcon icon={faUser} /></Link>
                <Link to='/search' className="hover:underline"><FontAwesomeIcon icon={faMagnifyingGlass} /></Link>
                <Link to='/cart' className="hover:underline"><FontAwesomeIcon icon={faCartShopping} /></Link> */}
            </div>
        </div>
    )
}

export default Nav;