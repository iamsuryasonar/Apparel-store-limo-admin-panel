import { Link } from 'react-router-dom'
function LogInPage() {
    return (<>
        <div className="w-11/12 md:w-4/6 m-[6rem] flex flex-col justify-center items-center gap-4">
            <h1 className="font-extrabold text-4xl">LOG IN</h1>
            {/* <p className="font-light text-xl">Don't have an account? <Link to='/sign-up' className="underline">Sign up here</Link></p> */}
            <div className="w-full flex flex-col justify-center items-center">
                <form className="w-full flex flex-col gap-6 font-light ">
                    <input type="email" placeholder='Email' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                    <input type="password" placeholder='Pasword' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                </form>
                <a href="" className="my-6 underline self-end font-light ">Forgot Password</a>
            </div>
            <div className="flex self-start items-center gap-4">
                <button className="px-6 py-2 bg-black text-white font-light">Sign In</button>
                {/* <a href="" className="underline font-light">Return to store</a> */}
            </div>
        </div>
    </>)
}

export default LogInPage;