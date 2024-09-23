const BASE_URL = "http://localhost:3000/api/v1";

export const authEndPoints = {
    LOGIN_API : BASE_URL + "/auth/login",
    SIGNUP_API : BASE_URL + "/auth/signup"
}


export const projectsEndPoints = {
    CREATE_PROJECT_API : BASE_URL + "/project/createproject",
    GET_PROJECT_API : BASE_URL + "/project/getproject",
    GET_PROJECTS_API : BASE_URL + "/project/getprojects",
    UPDATE_PROJECT_API : BASE_URL + "/project/updateproject",
    DELETE_PROJECT_API : BASE_URL + "/project/deleteproject"
}