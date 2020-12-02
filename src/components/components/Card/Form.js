import moment from 'moment';
import React, { useState , useEffect, useRef} from 'react';
import Form from 'react-jsonschema-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createTask, updateTask } from '../../../store/actionCreators';
import { CREATE_TASK, UPDATE_TASK } from '../../../store/actions';
import DatePickerCustom from '../../FormControl/DatePicker';

function initialState(userPreferenceData={}){
    let {
        message,
        due_date,
        priority,
        assigned_to
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
        // enum: ['', 'Akash', 'Vikas', 'Sharma'],
        // enumNames: ['Select a User', '1', '2', '3'],
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
                enum: ['Select a value', '1', '2', '3'],
                enumNames: ['', 'High', 'Medium', 'Low'],
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
        classNames: 'template1 margin-bottom-16',
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
        classes: { backgroundPrimaryDarkColor = '' } = {},
        createTask,
        updateTask,
        usersList,
        location:{
            state:{id:taskEditId}={},
        }={},
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
            let data = initialState(oldData);
            editTaskDetail.current = data;
            setFormData(data);
        }  
    }, [])

    // did mount

    // useEffect(() => {
    //     let data = initialState(userPreferenceData);
    //     setFormData(data);
    // }, [userPreferenceData]);

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
            priority,
            assigned_to,
            due_date
        } = formData;
        let required= "*Required";
        if(!message){
            errors.message.addError(required);
        }
        if(!assigned_to){
            errors.assigned_to.addError(required);
        }
        if(!due_date){
            errors.due_date.addError(required);
        }
        if(!priority){
            errors.priority.addError(required);
        }
        return errors;
    }

    function onSubmit(form) {
        let { onSubmit } = props;
        setLoader(true);
        let formData = {
            ...form.formData,
        };
        if(form.formData.due_date){
            formData.due_date = moment(form.formData.due_date).format("YYYY-MM-DD HH:mm:ss")
        }
        if(editTaskDetail.current){
            formData.taskid = taskEditId
        }
        let fn = editTaskDetail.current ? updateTask : createTask;
        fn(formData,({status})=>{
            setLoader(false);
            if(status){
                props.history.replace('/');
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
                        className={`width-100 border-none font-family-poppins color-white font-18 font-16-xs padding-left-16 padding-right-16 padding-top-8 padding-bottom-8 margin-top-8 cursor-pointer ${backgroundPrimaryDarkColor} border-radius-none`}>
                        Create Task{' '}
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
