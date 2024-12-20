import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom';
import { clearMessage } from '../../store/slices/messageSlice'
import { login } from '../../store/slices/authSlice'

function LogInPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const { message } = useSelector((state) => state.message);

    const [input, setInput] = useState({
        email: '',
        password: '',
    });

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
        dispatch(login(input))
            // .unwrap()
            .then(() => {
                navigate("/dashboard");
            })
    }

    function handleAutoFillGuestCreds() {
        setInput({
            email: 'admin@limostore.com',
            password: '11111111',
        })
    }


    return (<>
        {/* {message && <BottomAlert message={message} />} */}
        <div className='w-full flex justify-center'>
            <div className=" max-w-md w-full mt-10 flex flex-col justify-center items-start gap-4">
                <h1 className="font-extrabold text-4xl">LOG IN</h1>
                <p className="font-light text-lg">Don't have an account? <Link to='/sign-up' className="underline">Sign up here</Link></p>
                <div className="w-full flex flex-col justify-center items-center gap-4">
                    <form className="w-full flex flex-col gap-4 font-light ">
                        <input onChange={onChangeHandler} value={input.email} type="email" name='email' placeholder='Email' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                        <input onChange={onChangeHandler} value={input.password} type="password" name='password' placeholder='Pasword' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                    </form>
                    <div className='w-full flex justify-between items-center'>
                        <div className="flex gap-4">
                            <button onClick={logInHandler} className="px-6 py-2 bg-black text-white font-light">Sign In</button>
                        </div>
                        <a href="" className="underline font-light self-start">Forgot Password</a>
                    </div>
                    <button
                        className="bg-slate-950 text-white px-2 py-1 place-self-end"
                        onClick={handleAutoFillGuestCreds}>Auto fill guest credentials
                    </button>
                </div>
            </div>
        </div >
    </>)
}

export default LogInPage;