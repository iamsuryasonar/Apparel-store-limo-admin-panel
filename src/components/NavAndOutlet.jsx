import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

function NavAndOutlet() {
    return (
        <>
            <Navbar />
            <div className='w-auto mt-20 overflow-hidden '>
                <div className=' mx-auto max-w-4xl min-h-svh bg-slate-50 p-6'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default NavAndOutlet;