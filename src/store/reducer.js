import initialState from './initialState';
import { DELETE_TASK, FETCH_ALL_TASKS, FETCH_ALL_USERS } from "./actions";


let reducer = (state=initialState, { type , payload }) => {
    console.log({type,payload})
    let { tasks=[] } = state;
    switch(type){
        case DELETE_TASK:{
            let updatedTasks = tasks.filter(({id})=> id !== payload);
            state = {
                ...state,
                tasks: updatedTasks
            }
            break;
        }
        case FETCH_ALL_TASKS:{
            let tasks = payload;
            state={
                ...state,
                tasks: tasks
            }
            break;
        }
        case FETCH_ALL_USERS:{
            let usersList = payload || [];
            let users = {};
            usersList.forEach(({id},index)=>{
                users[id] = index;
            })
            state={
                ...state,
                users: users,
                usersList: usersList
            }
        }
    }

    return state;
};

export default reducer;