import actions from "./actions";

function createTask(payload){
    return {
        type: actions.CREATE_TASK,
        payload: payload
    }
}

function updateTask(payload){
    return {
        type: actions.UPDATE_TASK,
        payload: payload
    }
}

function deleteTask(payload) {
    return {
        type: actions.DELETE_TASK,
        payload: payload,
    };
}

export {
    createTask, 
    deleteTask,
    updateTask
}