import React, { useState } from 'react';
import code from "../Images/code.png";
import deleteImg from "../Images/delete.png";
import ConfirmationModal from './ConfirmationModal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteproject, getproject } from '../Services/API_Operations';
import { useNavigate } from 'react-router-dom';

const NormalList = ({ project }) => {
    const [ConfirmationStatus, setConfirmationStatus] = useState(false);
    const dispatch = useDispatch();
    const nagivate = useNavigate();

    const user = useSelector((state) => state.auth);
    const userID = user?.user?._id;  
    const projectID = project?._id;  

    const moveToParticularCodeEditor = () => {
        dispatch(getproject(userID, projectID, nagivate));
    }  

    const confirmationModalData = {
        text1: "Do you want to delete this project",
        btn1Text: "Delete",
        btn2Text: "Cancel",
        btn1Handler: () => {dispatch(deleteproject(projectID, userID)), setConfirmationStatus(false)},
        btn2Handler: () => setConfirmationStatus(false),
    };

    return (
        <div className="listCard mb-2 w-[full] flex items-center justify-between p-[10px] bg-[#141414] rounded-lg hover:bg-[#202020]">
            <div className='flex items-center gap-2'>
                <img onClick={() => moveToParticularCodeEditor()} className='w-[80px] cursor-pointer ' src={code} alt="" />
                <div>
                    <h3 className='text-[20px]'>{project.title}</h3>
                    <p className='text-[gray] text-[14px]'>Created in {new Date(project.createdAt).toDateString()}</p>
                </div>
            </div>

            <div>
                <img onClick={() => setConfirmationStatus(true)} className='w-[30px] cursor-pointer mr-4' src={deleteImg} alt="" />
            </div>

            {ConfirmationStatus && <ConfirmationModal modalData={confirmationModalData} />}
        </div>
    );
};

export default NormalList;
