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
        usersList.forEach(({id, name})=>{
            userObj.enum.push(String(id));
            userObj.enumNames.push(name);
        })
    }
    let obj = {
        title: '',
        type: 'object',
        properties: {
            due_date: {
                type: 'string',
                title: 'Start Date',
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
        usersList,
        formValue
    } = props;
    const [formData, setFormData] = useState(formValue);
    const [widgets] = useState(()=>getWidget());
    const [formSchema,setFormSchema] = useState(()=>initialFormSchema(usersList));
    const [formUISchema] = useState(initialFormUISchema);
    const [fields] = useState(() => initialFields(props));

    useEffect(() => {
        let state = initialFormSchema(usersList);
        setFormSchema(state);
    }, [usersList])


    function onChange(form) {
        let { formData } = form;
        setFormData(formData);
    }

    function validate(_, errors) {
        return errors;
    }

    function onSubmit(form) {
        let { onSubmit } = props;
        if(form.formData.due_date){
            formData.due_date = moment(form.formData.due_date).format("YYYY-MM-DD HH:mm:ss")
        }
        onSubmit(formData);
        return form;
    }

    function onReset(){
        let { onReset } = props;
        setFormData({});
        onReset({});
    }

    return (
        <div className={` padding-left-12 padding-right-12`}>
            <div className={'font-18 font-16-xs margin-bottom-12'}>
                Filter :
            </div>
            <Form
                formData={formData}
                onChange={onChange}
                className={
                    'margin-bottom-16 font-14'
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
                <div className={'width-100 display-flex'}>
                    <button
                        type="reset"
                        className={`width-100  font-family-poppins font-16 font-14-xs cursor-pointer  border-radius-none theme-color-dark border-light-grey`} 
                        style={{
                            background: 'white',
                            minHeight: "40px"
                        }}
                        onClick={onReset}>
                        Reset
                    </button>
                    <button
                        type="submit"
                        className={`width-100  font-family-poppins color-white font-16 font-14-xs cursor-pointer  border-radius-none theme-primary-background border-none`}
                        style={{
                            minHeight: "40px"
                        }}>
                        Apply Filter
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
