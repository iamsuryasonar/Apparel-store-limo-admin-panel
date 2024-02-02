import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { clearMessage } from '../../store/slices/messageSlice'
import { register } from '../../store/slices/authSlice'
import BottomAlert from "../../components/BottomAlert";

function RegisterPage() {

    const dispatch = useDispatch();

    const [input, setInput] = useState({});
    const [successful, setSuccessful] = useState(false);
    const { message } = useSelector((state) => state.message);


    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const onChangeHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    const registerHandler = (e) => {
        e.preventDefault();
        setSuccessful(false);
        dispatch(register(input))
            // .unwrap()
            .then(() => {
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            });
    }


    return (<>
        {message && <BottomAlert message={message} />}
        <div className='w-full h-svh flex justify-center bg-slate-50'>
            <div className="max-w-2xl w-full m-6 md:p-20 flex flex-col justify-center items-center gap-4">
                <h1 className="font-extrabold text-4xl">SIGN UP</h1>
                <p className="font-light text-xl">Have an account? <Link to='/' className="underline">Sign in here</Link></p>
                <div className="w-full flex flex-col justify-center items-center">
                    <form className="w-full flex flex-col gap-6 font-light ">
                        <input onChange={onChangeHandler} type="text" name='name' placeholder='Name' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                        <input onChange={onChangeHandler} type="email" name='email' placeholder='Email' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                        <input onChange={onChangeHandler} type="password" name='password' placeholder='Pasword' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                    </form>
                </div>
                <div className="flex self-start items-center gap-4">
                    <button onClick={registerHandler} className="px-6 py-2 bg-black text-white font-light">Sign Up</button>
                </div>
            </div>
        </div >
    </>)
}

export default RegisterPage;