import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'


function NavAndOutlet() {

    return (
        <>
            <Navbar />
            <div className='w-screen h-20'></div>
            <div className='w-screen my-10'>
                <div className='mx-auto max-w-4xl min-h-svh '>
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default NavAndOutlet;