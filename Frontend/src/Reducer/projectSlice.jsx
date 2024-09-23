import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allProject: JSON.parse(localStorage.getItem('allProjects')) || [],
    currentProject: JSON.parse(localStorage.getItem('currentProject')) || {}
};

const projectSlice = createSlice({
    name: "project",
    initialState: initialState,
    reducers: {
        setAllProject(state, value) {
            state.allProject = value.payload;
        },
        clearAllProject(state) {
            state.allProject = [];
        },
        addProject(state, value) {
            state.allProject.push(value.payload);
        },
        setCurrentProject(state, value) {
            state.currentProject = value.payload;
        }
    }
});

export const { setAllProject, clearAllProject, addProject, setCurrentProject } = projectSlice.actions;

export default projectSlice.reducer;