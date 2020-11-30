import initialState from './initialState';
import actions from "./actions";


let reducer = (state=initialState, { type , payload }) => {
    let { tasks=[] } = state;
    switch(type){
        case actions.DELETE_TASK:{
            let updatedTasks = tasks.filter(({id})=> id !== payload);
            state = {
                ...state,
                tasks: updatedTasks
            }
        }
    }

    return state;
};

export default reducer;