import { Link } from 'react-router-dom'
import { clearMessage } from '../store/slices/messageSlice'
import { login } from '../store/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


function LogInPage() {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { message } = useSelector((state) => state.message);

    const [input, setInput] = useState({});

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const onChangeHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    const logInHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(login(input))
            // .unwrap()
            .then(() => {
                navigate("/dashboard");
            })
            .catch(() => {
                setLoading(false);
            });
    }


    return (<>
        <div className='w-full h-svh flex justify-center bg-slate-50'>
            <div className=" max-w-2xl w-full p-6 md:p-20 flex flex-col justify-center items-center gap-4">
                <h1 className="font-extrabold text-4xl">LOG IN</h1>
                <p className="font-light text-xl">Don't have an account? <Link to='/sign-up' className="underline">Sign up here</Link></p>
                <div className="w-full flex flex-col justify-center items-center">
                    <form className="w-full flex flex-col gap-6 font-light ">
                        <input onChange={onChangeHandler} type="email" name='email' placeholder='Email' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                        <input onChange={onChangeHandler} type="password" name='password' placeholder='Pasword' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                    </form>
                    <a href="" className="my-6 underline self-end font-light ">Forgot Password</a>
                </div>
                <div className="flex self-start items-center gap-4">
                    <button onClick={logInHandler} className="px-6 py-2 bg-black text-white font-light">Sign In</button>
                    {/* <a href="" className="underline font-light">Return to store</a> */}
                </div>
            </div>
        </div >
    </>)
}

export default LogInPage;