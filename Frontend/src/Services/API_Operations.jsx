import { clearUser, setLoading, setToken, setUser } from "../Reducer/authSlice";
import { clearAllProject, setAllProject, addProject, setCurrentProject } from "../Reducer/projectSlice";
import { apiConnection } from "./API_Connection";
import { authEndPoints, projectsEndPoints } from "./API_Routes";
import { toast } from "react-hot-toast";

const { LOGIN_API, SIGNUP_API } = authEndPoints;

const { GET_PROJECTS_API, DELETE_PROJECT_API , CREATE_PROJECT_API, GET_PROJECT_API, UPDATE_PROJECT_API} = projectsEndPoints;

export function signup(username, name, email, pwd, navigate) {
    return async (dispatch) => {
        const toastID = toast.loading("One Step Away from Creating Account...");
        dispatch(setLoading(true));
        
        try {
            const response = await apiConnection("POST", SIGNUP_API, { username, name, email, pwd });
            
            if (!response?.data?.success) {
                throw new Error(response?.data?.message);
            }

            toast.success("SignUp Successful, Check Your Email");
            navigate("/login");

            return ""; 
        } 
        catch (error) {
            toast.error(error.response?.data?.message);
            navigate("/signup");
            return error?.response?.data?.message;
        } 
        finally {
            dispatch(setLoading(false));
            toast.dismiss(toastID);
        }
    };
}


export function login(email, pwd, navigate) {
    return async (dispatch) => {
        
        dispatch(setLoading(true));
        try {
            const response = await apiConnection("POST", LOGIN_API, { email, pwd });

            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }

            toast.success("Login Successful");

            const user = {
                name: response?.data?.userExist?.name || "No Name",
                username: response?.data?.userExist?.username || "No Username",
                email: response?.data?.userExist?.email || "No Email",
                _id: response?.data?.userExist?._id || "No ID",
            };

            dispatch(setUser(user));
            dispatch(setToken(response.data.token));

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(user));
            
            navigate("/");

            return ""; 
        } 
        catch (error) {
            toast.error(error.response.data.message);
            navigate("/login");
            return error.response.data.message; 
        } 
        finally {
            dispatch(setLoading(false));
        }
    };
}


export function getallprojects(userID) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnection("GET", `${GET_PROJECTS_API}?userID=${userID}`);
            
            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }

            const projects = response?.data?.projects;
            dispatch(setAllProject(projects));

            // Save to localStorage
            localStorage.setItem('allProjects', JSON.stringify(projects));

        } catch (error) {
            console.log("error is ", error);
        } finally {
            dispatch(setLoading(false));
        }
    };
}


export function deleteproject(projectID, userID) {
    return async (dispatch, getState) => {
        try {
            const response = await apiConnection("DELETE", DELETE_PROJECT_API, { projectID, userID });
            
            if (!response?.data?.success) {
                throw new Error(response?.data?.message);
            }

            const currentProjects = getState().project.allProject;

            const updatedProjects = currentProjects.filter(project => project._id !== projectID);

            dispatch(setAllProject(updatedProjects));

            toast.success("Project Deleted");
        } 
        catch (error) {
            console.log("deleteProject error:", error);
            toast.error(error.message);
        }    
    }
}


export function logout(navigate){
    return async(dispatch) => {
        dispatch(clearUser());
        dispatch(clearAllProject());

        localStorage.removeItem('token');
        localStorage.removeItem('user');  
        localStorage.removeItem('allProjects'); 
        toast.success("Logout Successful");
        navigate("/login");
    }
}


export function createproject(title, userID) {
    return async (dispatch) => {
        try {
            const response = await apiConnection("POST", CREATE_PROJECT_API, { title, userID });
            const newProject = response?.data?.projectInfo;


            if(!newProject){
                throw new Error("Project creation failed");
            }

            dispatch(addProject(newProject));

            const existingProjects = JSON.parse(localStorage.getItem('projects')) || [];
            existingProjects.push(newProject);
            localStorage.setItem('projects', JSON.stringify(existingProjects));

            localStorage.setItem(`project_${newProject._id}`, JSON.stringify(newProject));
            
            return newProject;
        } 
        catch (error) {
            console.error("Error creating project:", error);
            toast.error("Failed to Create Project");
            return null;
        }
    }
}


export function getproject(userID, projectID, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true)); 
        try {
            const response = await apiConnection("GET", `${GET_PROJECT_API}?userID=${userID}&projectID=${projectID}`);
            
            if (!response?.data?.success) {
                throw new Error(response.data.message || "Failed to fetch project");
            }

            const projectData = response.data.project;
            
            if (!projectData) {
                throw new Error("Project not found");
            }

            dispatch(setCurrentProject(projectData));
            localStorage.setItem(`project_${projectID}`, JSON.stringify(projectData));

            navigate(`codeEditor/${projectID}`);

        } catch (error) {
            console.error("Error fetching the project:", error);
            navigate('/');
        } finally {
            dispatch(setLoading(false)); 
        }
    };
}

export function updateproject(userID, projectID, htmlCode, cssCode, jsCode) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnection("PUT", UPDATE_PROJECT_API, { userID, projectID, htmlCode, cssCode, jsCode });

            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }

            const updatedProject = response.data.project;

            dispatch(setCurrentProject(updatedProject));

            localStorage.setItem(`project_${projectID}`, JSON.stringify(updatedProject));

            toast.success("Code Saved");
        } 
        catch (error) {
            console.log("Error updating project:", error);
        } 
        finally {
            dispatch(setLoading(false));
        }
    };
}
