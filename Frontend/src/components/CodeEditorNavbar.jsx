import React from 'react';
import logo from "../Images/logo.png";
import { FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const CodeEditorNavbar = ({ project, passDataToParent }) => {
    const navigate = useNavigate();

    const sendDataToParent = () => {
        passDataToParent();
    };

    return (
        <div className="EditiorNavbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">

            <div className="logo">
                <img className='w-[150px] cursor-pointer' src={logo} alt="" />
            </div>

            <p className='text-xl'>
                Project name / {" "}
                <span className='text-blue-300'>
                    {project && project.title ? project.title : 'My New Project'}
                </span>
            </p>

            <p className="flex items-center gap-2 p-[8px] bg-black rounded-[5px] cursor-pointer text-[15px]">
                <button onClick={sendDataToParent}
                    className="flex items-center gap-2 text-[15px] p-2 bg-transparent border-none rounded hover:bg-[#2e2e2e]">
                    Save Codes
                </button>

                <button onClick={() => navigate("/")} className="flex items-center gap-1 text-[15px] p-2 bg-transparent border-none rounded hover:bg-[#2e2e2e]">
                    <FaHome className="text-[20px]" />
                    <span>Page</span>
                </button>
            </p>

        </div>
    );
};

export default CodeEditorNavbar;
