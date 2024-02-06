import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice'
import LoadingBar from './LoadingBar';

const Navbar = () => {
    const [menu, setMenu] = useState(false);

    const dispatch = useDispatch();
    const location = useLocation();

    const user = useSelector((state) => state.auth.userData);
    const loading = useSelector((state) => state.loading.loading);
    const currentPageName = location.pathname;

    const toggle = () => {
        setMenu(!menu);
    };

    let authNavItems = [
        {
            id: 1,
            title: 'Dashboard',
            path: '/dashboard'
        },
        {
            id: 2,
            title: 'Products',
            path: '/products'
        },
        {
            id: 3,
            title: 'Category',
            path: '/category'
        },
        {
            id: 4,
            title: 'Orders',
            path: '/orders'
        },
    ]

    let navItems = [
        {
            id: 1,
            title: 'Log In',
            path: '/'
        },
        {
            id: 2,
            title: 'Sign Up',
            path: '/sign-up'
        },
    ]

    const logOutHandler = () => {
        dispatch(logout());
    }

    return <>
        {
            loading && <LoadingBar />
        }
        <div className=' w-full h-20 fixed top-0 left-0 right-0 px-6 shadow-md bg-white z-10 flex items-center'>
            <div className=" w-full mx-auto max-w-screen-lg font-sans flex flex-row justify-between items-center">
                <Link to="/" className="text-xl font-bold hover:scale-110 transition-all duration-300 ease-in-out uppercase">Limo<span className="text-blue-600">Store</span></Link>
                <div className="hidden md:flex md:flex-row md:justify-between md:gap-4 text-base  items-center">
                    {
                        user ?
                            authNavItems.map((item) => {
                                return <Link key={item.id} to={item.path} className={`text-base hover:text-blue-600 hover:underline underline-offset-4 ${currentPageName === item.path ? 'text-blue-600' : ''}`}>{item.title}</Link>
                            }) :
                            navItems.map((item) => {
                                return <Link key={item.id} to={item.path} className={`text-base hover:text-blue-600 hover:underline underline-offset-4 ${currentPageName === item.path ? 'text-blue-600' : ''}`}>{item.title}</Link>
                            })
                    }
                    {
                        user &&
                        <button onClick={logOutHandler}
                            className='px-2 rounded-xl flex justify-center items-center font-bold bg-slate-600 hover:bg-black text-white active:bg-black'>
                            Log Out
                        </button>
                    }
                </div>
                <FontAwesomeIcon className="text-2xl md:hidden hover:scale-150 transition-all duration-300 ease-in-out" icon={faBars} onClick={() => toggle()} />
            </div>
            {menu && <div className='bg-white flex flex-col justify-center items-center gap-6 fixed top-0 bottom-0 right-0 left-1/4 md:hidden z-10'>
                <FontAwesomeIcon className="text-3xl fixed top-7 right-10 hover:scale-150 transition-all duration-300 ease-in-out " icon={faXmark} onClick={() => toggle()} />
                {
                    user ?
                        authNavItems.map((item) => {
                            return <Link key={item.id} to={item.path} onClick={() => toggle()} className={`text-2xl hover:scale-150 transition-all duration-300 ease-in-out ${currentPageName === item.path ? 'text-blue-600' : ''}`}>{item.title} </Link>
                        }) :
                        navItems.map((item) => {
                            return <Link key={item.id} to={item.path} onClick={() => toggle()} className={`text-2xl hover:scale-150 transition-all duration-300 ease-in-out  ${currentPageName === item.path ? 'text-blue-600' : ''}`}>{item.title} </Link>
                        })
                }
                {
                    user &&
                    <button onClick={() => {
                        logOutHandler();
                        toggle();
                    }
                    } className='px-2 rounded-xl flex justify-center items-center font-bold bg-slate-600 hover:bg-black text-white active:bg-black'>
                        Log Out
                    </button>
                }
            </div>}
        </div>
    </>
};

export default Navbar;