import {
    CREATE_TASK,
    UPDATE_TASK,
    DELETE_TASK,
    FETCH_ALL_TASKS,
    FETCH_ALL_USERS,
} from './actions';
import httpRequest from "../http-request/index";
import httpConfig from "../http-request/config"
import { objectToFormData } from '../http-request/helper';

let repo = new httpRequest({
    url: "tasks",
    httpHeaders: {
        "AuthToken": httpConfig.API_KEY,
    },
})

function fetchAllTasks({ cb }={}){
    return async function (dispatch){
        let { data: { status = '', tasks = [] } = {} } = await repo
            .get('list')
            .catch((err) => err);
        dispatch({
            type: FETCH_ALL_TASKS,
            payload: tasks
        });
        if(cb){
            cb({
                status:status && String(status).toLowerCase() === 'success' ? true : false
            })
        }
    }
}

function fetchAllUsers({ cb }={}){
    return async function (dispatch){
        let { data: { status = '', users = [] } = {} } = await repo
            .get('listusers')
            .catch((err) => err);
        dispatch({
            type: FETCH_ALL_USERS,
            payload: users
        });
        if(cb){
            cb({
                status:status && String(status).toLowerCase() === 'success' ? true : false
            })
        }
    }
}

function createTask({cb, payload}) {
    return async function (dispatch){
        let formData = objectToFormData(payload)
        let { data: { status = '' } = {} } = await repo.post("create",formData,).catch(err=>err);
        if(cb){
            cb({
                status: status && String(status).toLowerCase() === 'success' ? true : false 
            });
        }
    }
}

function deleteTask({cb, payload}) {
    return async function (dispatch){
        let formData = objectToFormData({taskid: payload})
        let { data: { status = '' } = {} } = await repo.post("delete",formData).catch(err=>err);
        if(status && String(status).toLowerCase() === 'success'){
            dispatch({
                type: DELETE_TASK,
                payload: payload,
            });
        }
        if(cb){
            cb({
                status: status && String(status).toLowerCase() === 'success' ? true : false 
            });
        }
    }
}


function updateTask(payload) {
    return {
        type: UPDATE_TASK,
        payload: payload,
    };
}


export { createTask, deleteTask, updateTask , fetchAllUsers , fetchAllTasks };
