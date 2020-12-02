import initialState from './initialState';
import { CREATE_TASK, DELETE_TASK, FETCH_ALL_TASKS, FETCH_ALL_USERS, UPDATE_TASK } from "./actions";


let reducer = (state=initialState, { type , payload }) => {
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
            console.log({users})
            state={
                ...state,
                users: users,
                usersList: usersList
            };
            break;
        }
        case CREATE_TASK:{
            let updatedTasks = [...tasks,payload];
            state = {
                ...state,
                tasks: updatedTasks
            }
            break;
        }
        case UPDATE_TASK:{
            let updatedTasks = tasks.map((data)=>{
                if(data.id === payload.taskid){
                    return payload;
                }
                return data
            })
            state = {
                ...state,
                tasks: updatedTasks
            }
        }
        default:
            break;
    }
    return state;
};

export default reducer;