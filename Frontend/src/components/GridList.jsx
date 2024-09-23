import React, { useState } from 'react'
import code from "../Images/code.png"
import deleteImg from "../Images/delete.png"
import ConfirmationModal from './ConfirmationModal'
import { useDispatch, useSelector } from 'react-redux';
import { deleteproject, getproject } from '../Services/API_Operations';
import { useNavigate } from 'react-router-dom';

export const GridList = ({project}) => {
  const [ConfirmationStatus, setConfirmationStatus] = useState(false);
  const dispatch = useDispatch();
  const nagivate = useNavigate();

  const user = useSelector((state) => state.auth);
  const userID = user?.user?._id;  
  const projectID = project?._id;
    
  const moveToParticularCodeEditor  = () => {
    dispatch(getproject(userID, projectID, nagivate));
  }  

  const confirmationModalData = {
    text1: "Do you want to delete this project",
    btn1Text: "Delete",
    btn2Text: "Cancel",
    btn1Handler: () => {dispatch(deleteproject(projectID, userID)), setConfirmationStatus(false)},
    btn2Handler: () => setConfirmationStatus(false) ,
  };

    return (
        <div className="gridCard bg-[#141414] w-[230px] p-[10px] h-[180px]  hover:bg-[#202020] rounded-lg shadow-lg shadow-black/50">
       
          <div>
            <img onClick={() => moveToParticularCodeEditor()} className="w-[90px] cursor-pointer" src={code} alt="" />
            <h3 className='text-[20px] w-[90%] line-clamp-1'>{project.title}</h3>
          </div>
        
          <div className='flex items-center justify-between'>
            <p className='text-[14px] text-[gray]'>Created in {new Date(project.createdAt).toDateString()}</p>
            <img onClick={() => setConfirmationStatus(true)} className='w-[30px] cursor-pointer' src={deleteImg} alt="" />
          </div>

          {
            ConfirmationStatus && 
            <ConfirmationModal modalData={confirmationModalData}/>
          }

      </div>
    )
}
