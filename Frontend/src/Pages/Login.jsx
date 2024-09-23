import React, {useState} from 'react'
import logo from "../Images/logo.png"
import coding1 from "../Images/coding1.jpg"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { login } from '../Services/API_Operations';

export const Login = () => {
    
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [err, setErr] = useState("");

    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        const error = await dispatch(login(email, pwd, navigate)); 

        if (error) {
            setErr(error);
        } else {
            setErr("");  
        }
    }

    return (
        <>
            <div className="container w-screen min-h-screen flex items-center justify-between pl-[100px]">
                <div className="left w-[35%]">
                    <img className='w-[200px]' src={logo} alt="" />

                    <form onSubmit={submitHandler} className='w-full mt-[60px]'>
                        <div className='inputBox'> 
                            <input  type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <div className='inputBox'> 
                            <input required type='password' placeholder='Password' value={pwd} onChange={(e) => setPwd(e.target.value)}/>
                        </div>

                        <p className='text-[gray]'>Don't have an account <Link to={"/signup"}  className='text-[#00AEEF]'>SignUp</Link></p>

                        {
                            err && 
                            <p className='text-red-500 mt-1' >{err}</p>
                        }
                        
                        <button className="btnBlue w-full mt-[20px]">Login</button>
                    </form>

                </div>

                <div className="right w-[55%]">
                    <img className='h-[100vh] w-[100%] object-cover' src={coding1} alt="" />
                </div>
            </div>
        </>
    )
}