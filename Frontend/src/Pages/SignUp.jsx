import React, {useState} from 'react'
import logo from "../Images/logo.png"
import main from "../Images/main.png"

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signup } from '../Services/API_Operations'

export const SignUp = () => {
    
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const dispatch = useDispatch();
    const nagivate = useNavigate();

    const [err, setErr] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();

        const error = await dispatch(signup(username, name, email, pwd, nagivate));

        setErr(error);
    }

    return (
        <>
            <div className="container w-screen min-h-screen flex items-center justify-between pl-[100px]">
                <div className="left w-[35%]">
                    <img className='w-[200px]' src={logo} alt="" />

                    <form onSubmit={submitHandler} className='w-full mt-[60px]'>
                        <div className='inputBox'> 
                            <input required type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </div>

                        <div className='inputBox'> 
                            <input required type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>

                        <div className='inputBox'> 
                            <input required type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <div className='inputBox'> 
                            <input required type='password' placeholder='Password' value={pwd} onChange={(e) => setPwd(e.target.value)}/>
                        </div>

                        <p className='text-[gray]'>Already have an account <Link to={"/login"}  className='text-[#00AEEF]'>Login</Link></p>

                        {
                            err && 
                            <p className='text-red-500 mt-1' >{err}</p>
                        }

                        <button className="btnBlue w-full mt-[20px]">Sign Up</button>
                    </form>

                </div>

                <div className="right w-[55%]">
                    <img className='h-[100vh] w-[100%] object-cover' src={main} alt="" />
                </div>
            </div>
        </>
    )
}