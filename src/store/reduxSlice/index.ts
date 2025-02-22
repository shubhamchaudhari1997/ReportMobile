import {combineReducers} from '@reduxjs/toolkit';
import login from './loginSlice';
import projectData from './projectDataSlice';

const reducer = combineReducers({
  login: login.reducer,
  projectData:projectData.reducer
});

export default reducer;
