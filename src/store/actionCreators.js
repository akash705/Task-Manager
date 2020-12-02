import {
    CREATE_TASK,
    UPDATE_TASK,
    DELETE_TASK,
    FETCH_ALL_TASKS,
    FETCH_ALL_USERS,
} from './actions';
import httpRequest from '../http-request/index';
import httpConfig from '../http-request/config';
import { objectToFormData, responseExtractor } from '../http-request/helper';

let repo = new httpRequest({
    url: 'tasks',
    httpHeaders: {
        AuthToken: httpConfig.API_KEY,
    },
});

function fetchAllTasks({ cb } = {}) {
    return async function (dispatch) {
        // { data: { status = '', tasks = [] } = {} }
        let response = await repo.get('list').catch((err) => err);
        let { status, data: tasks = [], error } = responseExtractor(
            response,
            'tasks'
        );
        dispatch({
            type: FETCH_ALL_TASKS,
            payload: tasks,
        });
        if (cb) {
            cb({
                status: status,
                error: error,
            });
        }
    };
}

function fetchAllUsers({ cb } = {}) {
    return async function (dispatch) {
        // { data: { status = '', users = [] } = {} }
        let response = await repo.get('listusers').catch((err) => err);
        let { status, data: users = [], error } = responseExtractor(
            response,
            'users'
        );
        dispatch({
            type: FETCH_ALL_USERS,
            payload: users,
        });
        if (cb) {
            cb({
                status: status,
                error: error,
            });
        }
    };
}

function createTask({ cb, payload }) {
    return async function (dispatch) {
        let formData = objectToFormData(payload);
        let response = await repo.post('create', formData).catch((err) => err);
        let { status, data: taskid, error } = responseExtractor(
            response,
            'taskid'
        );
        if (status) {
            dispatch({
                type: CREATE_TASK,
                payload: {
                    ...payload,
                    id: taskid,
                },
            });
        }
        if (cb) {
            cb({
                status: status,
                error: error,
            });
        }
    };
}

function deleteTask({ cb, payload }) {
    return async function (dispatch) {
        let formData = objectToFormData({ taskid: payload });
        // let { data: { status = '' } = {} } 
        let response = await repo
            .post('delete', formData)
            .catch((err) => err);
        let { status , error } = responseExtractor(response,"")
        if (status) {
            dispatch({
                type: DELETE_TASK,
                payload: payload,
            });
        }
        if (cb) {
            cb({
                status: status,
                error
            });
        }
    };
}

function updateTask({ cb, payload }) {
    return async function (dispatch) {
        let formData = objectToFormData(payload);
        // let { data: { status = '' } = {} } 
        let response = await repo
            .post('update', formData)
            .catch((err) => err);
        let { status: isSuccess , error } = responseExtractor(response)
        if (isSuccess) {
            dispatch({
                type: UPDATE_TASK,
                payload: payload,
            });
        }
        if (cb) {
            cb({
                status: isSuccess,
                error
            });
        }
    };
}

export { createTask, deleteTask, updateTask, fetchAllUsers, fetchAllTasks };
