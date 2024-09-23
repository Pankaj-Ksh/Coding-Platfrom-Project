import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { GridList } from '../components/GridList';
import NormalList from '../components/NormalList';
import ConfirmationModal from '../components/ConfirmationModal';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { createproject, getallprojects } from '../Services/API_Operations';
import toast from 'react-hot-toast';

const Home = () => {
    const [isGridLayout, setIsGridLayout] = useState(false);
    const [confirmationStatus, setConfirmationStatus] = useState(false);
    const [newProjectTitle, setNewProjectTitle] = useState("");
    
    const navigate = useNavigate();
    const { user, token } = useSelector((state) => state.auth);
    const { allProject, loading} = useSelector((state) => state.project);  
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user || !token) {
            navigate('/login');
        } else {
            dispatch(getallprojects(user._id));
        }
    }, [user, token, navigate, dispatch]);
    
    const confirmationModalData = {
        text1: "Do you want to Create New project",
        btn1Text: "Create",
        btn2Text: "Cancel",
        btn1Handler: async ()  => {
            if(newProjectTitle.trim()){
                const createdProject = await dispatch(createproject(newProjectTitle, user._id));
    
                if(createdProject) {
                    navigate(`/codeEditor/${createdProject._id}`); 
                }
            }
            else{
                toast.error("Enter New Project Title");
            }
            setConfirmationStatus(false);
            setNewProjectTitle("");
        },
        btn2Handler: () => { setNewProjectTitle(""), setConfirmationStatus(false)},
    };

    if (!user || !token || loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl text-gray-600">{!user || !token ? "Authenticating..." : "Loading projects..."}</p>
            </div>
        );
    }

    return (
        <>
            <Navbar isGridLayout={isGridLayout} setIsGridLayout={setIsGridLayout} />

            <div className='flex items-center justify-between px-[100px] my-[40px]'>
                <h2 className='text-2xl'>Hi, {user.username} 👋</h2>

                <div className='flex items-center gap-4'>
                    <div className="inputBox !w-[200px]  border border-solid border-transparent hover:border-1 hover:border-cyan-400">
                        <input type="text" value={newProjectTitle} placeholder='Enter New Project Title ... !' onChange={(e) => setNewProjectTitle(e.target.value)}/>
                    </div>
                    <button onClick={() => setConfirmationStatus(true)} className='btnBlue rounded-[5px] mb-4 text-[20px] !p-[5px] !px-[10px]'>
                        +
                    </button>
                </div>
            </div>

            <div>
                {isGridLayout ? (
                    <div className='grid px-[100px] gap-9'>
                        {allProject.length > 0 ? (
                            allProject.map((project, index) => (
                                <GridList key={index} project={project} />
                            ))
                        ) : (
                            <p className='text-blue-300 text-xl'>No projects found, Create Your Project</p>
                        )}
                    </div>
                ) : (
                    <div className='flex flex-col gap-5 px-[100px]'>
                        {allProject.length > 0 ? (
                            allProject.map((project, index) => (
                                <NormalList key={index} project={project} />
                            ))
                        ) : (
                            <p className='text-blue-300 text-xl'>No projects found, Create Your Project</p>
                        )}
                    </div>
                )}
            </div>

            {confirmationStatus && <ConfirmationModal modalData={confirmationModalData} />}
        </>
    );
};

export default Home;
