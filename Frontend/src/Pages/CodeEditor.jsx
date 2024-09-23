import React, { useEffect, useState, useRef } from 'react';
import CodeEditorNavbar from '../components/CodeEditorNavbar';
import { TbLayoutSidebarLeftExpand, TbLayoutSidebarRightExpand } from "react-icons/tb";
import Editor from '@monaco-editor/react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateproject, getproject } from '../Services/API_Operations';
import { useNavigate } from 'react-router-dom';
import { setCurrentProject } from '../Reducer/projectSlice';

export const CodeEditor = () => {
    const [tab, setTab] = useState("html");
    const [isExpanded, setIsExpanded] = useState(false);
    const { projectID } = useParams();

    const currentProject = useSelector((state) => state.project.currentProject);
    const [loading, setLoading] = useState(true);
    const [htmlCode, setHtmlCode] = useState("");
    const [cssCode, setCssCode] = useState("");
    const [jsCode, setJsCode] = useState("");

    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
    const fetchProject = async () => {
        setLoading(true);
        try {

            const storedProject = localStorage.getItem(`project_${projectID}`);

            if(storedProject) {
                const projectData = JSON.parse(storedProject);
                
                if (currentProject?._id !== projectData._id) {
                    dispatch(setCurrentProject(projectData));
                }
                setLoading(false);
                return;
            }

            const projectData = await dispatch(getproject(user.user._id, projectID, navigate));
                        
            if (projectData) {
                navigate(`codeEditor/${projectData._id}`);
            } 
            else {
                navigate('/'); 
            }
        } 
        catch (error) {
            console.log("Error fetching project:", error);
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    if (projectID) {
        fetchProject();
    } else {
        navigate('/');
    }
}, [projectID, currentProject, dispatch, navigate, user.user._id]);

    useEffect(() => {
        if (currentProject) {
            setHtmlCode(currentProject.htmlCode || "<h1>Happy Coding...</h1>");
            setCssCode(currentProject.cssCode || "body { text-align:center; background-color: #f4f4f4; color:#1e1e1e; }");
            setJsCode(currentProject.js || "// Write Your JS Functionality");
            setLoading(false);
        }
    }, [currentProject]);


    const debounceTimeout = useRef(null);
    const debounceRun = () => {
        clearTimeout(debounceTimeout.current);
        
        debounceTimeout.current = setTimeout(() => {
            run();
        }, 500);
    };

    const run = () => {
        const html = htmlCode || "<h1>Happy Coding...</h1>";
        const css = `<style>${cssCode || "body { text-align:center; background-color: #f4f4f4; color:#1e1e1e;"}</style>`;
        const js = `<script>${jsCode || "// Write Your JS Functionality"}</script>`;
        const iframe = document.getElementById("iframe");

        if (iframe) {
            iframe.srcdoc = '';
            iframe.srcdoc = html + css + js;
        }
    };

    useEffect(() => {
        if (!loading) {
            run();
        }
    }, [tab, loading]);

    useEffect(() => {
        if (!loading) {
            debounceRun();
        }
    }, [htmlCode, cssCode, jsCode, loading]);

    
    const handleChildData = () => {
        if (user.user && user.user._id) {
            dispatch(updateproject(user.user._id, projectID, htmlCode, cssCode, jsCode));
        } else {
            console.error("User or user ID is not available");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <CodeEditorNavbar project={currentProject} passDataToParent={handleChildData} />

            <div className='flex'>
                <div className={`left ${isExpanded ? 'w-full' : 'w-1/2'}`}>
                    <div className="tabs flex items-center justify-between gap-2 w-full bg-[#1A1919] h-[50px] px-[40px]">
                        <div className="tabs flex items-center gap-4 mb-1 mt-1">
                            <div onClick={() => { setTab("html"); }}
                                className={`tab cursor-pointer p-[6px] px-[10px] text-[15px] rounded-md
                                    ${tab === "html" ? "bg-[#f4b327]" : "bg-[#1E1E1E]"}`}>
                                HTML
                            </div>

                            <div onClick={() => { setTab("css"); }}
                                className={`tab cursor-pointer p-[6px] px-[10px] text-[15px] rounded-md
                                    ${tab === "css" ? "bg-[#007ACC]" : "bg-[#1E1E1E]"}`}>
                                CSS
                            </div>

                            <div onClick={() => { setTab("js"); }}
                                className={`tab cursor-pointer p-[6px] px-[10px] text-[15px] rounded-md
                                    ${tab === "js" ? "bg-[#fb8422]" : "bg-[#1E1E1E]"}`}>
                                JavaScript
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <p className="text-[20px] cursor-pointer" 
                                onClick={() => setIsExpanded(!isExpanded)}>
                                    {isExpanded ? (<TbLayoutSidebarRightExpand />) : (<TbLayoutSidebarLeftExpand />)}
                            </p>
                        </div>
                    </div>

                    {tab === "html" ? (
                        <Editor
                            onChange={(value) => { setHtmlCode(value || ""); }}
                            height="82vh"
                            language="html"
                            theme='vs-dark'
                            value={htmlCode}
                        />
                    ) : tab === "css" ? (
                        <Editor
                            onChange={(value) => { setCssCode(value || ""); }}
                            height="82vh"
                            language="css"
                            theme='vs-dark'
                            value={cssCode}
                        />
                    ) : (
                        <Editor
                            onChange={(value) => { setJsCode(value || ""); }}
                            height="82vh"
                            language="javascript"
                            theme='vs-dark'
                            value={jsCode}
                        />
                    )}
                </div>

                {!isExpanded && (
                    <iframe id='iframe' title='output' className="w-1/2 min-h-[82vh] bg-white text-black" />
                )}
            </div>
        </div>
    );
};

export default CodeEditor;