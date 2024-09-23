import React, { useEffect, useState } from 'react';
import logo from "../Images/logo.png";
import Avatar from 'react-avatar';
import { BsGridFill } from "react-icons/bs";
import { toggleClass } from '../Utility/Helper';
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { logout } from '../Services/API_Operations';
import ConfirmationModal from './ConfirmationModal'

const Navbar = ({ isGridLayout, setIsGridLayout }) => {
    const { user, token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [on, setOn] = useState(false);

    useEffect(() => {
        if (!user || !token) {
            return <div>Loading...</div>; 
        }
    }, [user, token, navigate]);

    const [ConfirmationStatus, setConfirmationStatus] = useState(false);

    const confirmationModalData = {
        text1: "Do you want to Logot",
        btn1Text: "Logout",
        btn2Text: "Cancel",
        btn1Handler: () => {dispatch(logout(navigate)), setConfirmationStatus(false)},
        btn2Handler: () => setConfirmationStatus(false) ,
      };

    return (
        <div className="navbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">
            <div className='logo'>
                <img className='w-[150px] cursor-pointer' src={logo} alt='logo' />
            </div>

            <div className="links flex items-center">
                <button onClick={() => {toggleClass(".dropDownNavbar", "hidden"); setOn(!on);}} 
                    className={`py-2 px-6 rounded-lg text-white ${on ? 'bg-[#00adef]' : 'bg-[#201f1f]  font-semibold '}`}>
                    Setting
                </button>
                <Avatar name={user?.name || "Default Name"} size="40" round="50%" className='cursor-pointer ml-2' />
            </div>

            <div className='dropDownNavbar flex flex-col hidden justify-center absolute right-[60px] top-[80px] shadow-lg shadow-black/50 p-[10px] rounded-lg bg-[#1A1919] min-w-[210px] h-[150px]'>
                <div className="py-[10px] border-b-[1px] border-b-[#fff]">
                    <h3 className="text-[15px] max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-center" style={{ lineHeight: 1 }}>
                        <i>{user.email}</i>
                    </h3>
                </div>

                <p onClick={() => setIsGridLayout(!isGridLayout)} className='flex items-center gap-2 mt-3 cursor-pointer h-9 px-2 hover:rounded-md text-green-400 hover:bg-[#2e2e2e] transition-colors duration-200' style={{ fontStyle: "normal" }}>
                    <BsGridFill className='text-[22px]' />
                    {isGridLayout ? "List" : "Grid"} layout
                </p>

                <p onClick={() => setConfirmationStatus(true)} className='flex items-center gap-2 mt-3 cursor-pointer h-9 px-2 text-red-400 hover:rounded-md hover:text-red-600 hover:bg-[#2e2e2e] transition-colors duration-200' style={{ fontStyle: "normal" }}>
                    <FiLogOut className='text-[22px]' />
                    Logout
                </p>
            </div>
            {
                ConfirmationStatus && 
                <ConfirmationModal modalData={confirmationModalData}/>
          }
        </div>
    );
};

export default Navbar;
