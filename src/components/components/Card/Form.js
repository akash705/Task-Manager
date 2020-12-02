import moment from 'moment';
import React, { useState , useEffect, useRef} from 'react';
import Form from 'react-jsonschema-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTask, updateTask } from '../../../store/actionCreators';
import { CREATE_TASK, UPDATE_TASK } from '../../../store/actions';
import DatePickerCustom from '../../FormControl/DatePicker';

function initialState(userPreferenceData={}){
    let {
        message='',
        due_date='',
        priority='',
        assigned_to=''
    } = userPreferenceData;

    let data = {
        message,
        due_date,
        priority,
        assigned_to,
    };

    return data;
}

let initialFormSchema = (usersList=[])=>{
    let userObj={
        enum:[''],
        enumNames: ['Select a User']
    }
    if(usersList.length){
        usersList.forEach(({id, name})=>{
            userObj.enum.push(String(id));
            userObj.enumNames.push(name);
        })
    }
    let obj = {
        title: '',
        type: 'object',
        properties: {
            message: {
                title: 'Message',
                type: 'string',
                placeholder: 'Enter a message',
            },
            due_date: {
                type: 'string',
                title: 'Due Date',
            },
            priority: {
                type: 'string',
                title: 'Priority',
                enum: ['', '1', '2', '3'],
                enumNames: ['Select a value', 'High', 'Medium', 'Low'],
                default: '',
            },
            assigned_to: {
                type: 'string',
                title: 'Assigned To',
                default: '',
                ...userObj
            },
        },
    };
    return obj;
}

let initialFormUISchema = {
    message: {
        classNames: 'template1 margin-bottom-16 ',
        "ui:widget": "textarea"
    },
    priority: {
        classNames: 'template1 margin-bottom-16',
    },
    assigned_to: {
        classNames: 'template1 margin-bottom-16',
    },
    due_date:{
        className: 'template1 margin-bottom-16',
        "ui:widget": "DateTimePicker"
    }
};
function initialFields() {
    let fields = {
    };
    return fields;
}
function getWidget(){
    let obj={
        DateTimePicker: DatePickerCustom
    }
    return obj;
}
function CreateTaskForm(props={}) {
    let {
        createTask,
        updateTask,
        usersList,
        match:{
            params:{
                taskId: taskEditId
            }={}
        }={},
        history={},
        tasks
    } = props;
    const [formData, setFormData] = useState({});
    const [widgets] = useState(()=>getWidget());
    const [formSchema,setFormSchema] = useState(()=>initialFormSchema(usersList));
    const [formUISchema] = useState(initialFormUISchema);
    const [fields] = useState(() => initialFields(props));
    const [loader, setLoader] = useState(false);
    const editTaskDetail = useRef(null)

    // did mount
    useEffect(() => {
        if(taskEditId){
            let oldData = tasks.find(({id})=>String(id) === String(taskEditId));
            if(oldData){
                let data = initialState(oldData);
                editTaskDetail.current = data;
                setFormData(data);
            }else {
                history.replace("/create");
                return toast(`Task not found !!!`);
            }
        }
    }, [taskEditId,history])

    // did mount



    useEffect(() => {
        let state = initialFormSchema(usersList);
        setFormSchema(state);
    }, [usersList])


    function onChange(form) {
        let { formData } = form;
        setFormData(formData);
    }

    function validate(formData, errors) {
        let { 
            message,
        } = formData;
        let required= "*Required";
        if(!message){
            errors.message.addError(required);
        }
        return errors;
    }

    function onSubmit(form) {
        setLoader(true);
        let { assigned_to='',priority='' } = form.formData;
        let formData = {
            ...form.formData,
            assigned_to,
            priority: priority
        };
        if(form.formData.due_date){
            formData.due_date = moment(form.formData.due_date).format("YYYY-MM-DD HH:mm:ss")
        }
        if(editTaskDetail.current){
            formData.taskid = taskEditId;
        }
        let fn = editTaskDetail.current ? updateTask : createTask;
        fn(formData,({status , error="Network Error !!!"})=>{
            setLoader(false);
            if(status){
                props.history.replace('/');
            }else {
                toast(error)
            }
        })
        return form;
    }

    return (
        <div>
            <Form
                formData={formData}
                onChange={onChange}
                className={
                    'margin-top-16 margin-bottom-16'
                }
                widgets={widgets}
                schema={formSchema}
                uiSchema={formUISchema}
                fields={fields}
                transformErrors={() => []}
                validate={validate}
                onSubmit={onSubmit}
                autocomplete={'off'}
                showErrorList={false}>
                <div className={'width-100'}>
                    <button
                        type="submit"
                        disabled={loader}
                        className={`width-100 border-none font-family-poppins color-white font-18 font-16-xs padding-left-16 padding-right-16 padding-top-8 padding-bottom-8 margin-top-8 cursor-pointer  border-radius-none ${loader ? 'theme-primary-background-light': 'theme-primary-background'} border-none`}>
                        { taskEditId ? "Update Task" : "Create Task" }{' '}
                        {loader ? (
                            <i
                                className={
                                    'color-white fa fa-spin fa-circle-o-notch font-16 margin-left-8'
                                }
                            />
                        ) : null}
                    </button>
                </div>
            </Form>
        </div>
    );
}


let mapsToProps = (
    { usersList=[] , tasks=[] } = {},
) => {
    return {
        usersList,
        tasks
    };
};

function dispatchToProps(dispatch){
    return {
        createTask: ( payload , cb)=>dispatch(createTask({type:CREATE_TASK , cb: cb , payload})),
        updateTask: ( payload , cb)=>dispatch(updateTask({type:UPDATE_TASK , cb: cb , payload})),
    }
}


export default connect(mapsToProps,dispatchToProps)(withRouter(CreateTaskForm));
