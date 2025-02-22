import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {initialState} from '../reduxState';


export const projectData=createSlice({
    name: 'projectData',
    initialState,
    reducers: {
        projectDataDetails:(state,action: PayloadAction<ProjectData[]>)=>{
            state.projectData=action.payload
            return state;
        }
    },
})

export const {projectDataDetails}=projectData.actions;

export default projectData;