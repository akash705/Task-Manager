import React, { useState , useEffect} from 'react';
import Form from 'react-jsonschema-form';
import DatePickerCustom from '../FormControl/DatePicker';

function initialState(userPreferenceData={}){
    let data = {
        message: '',
        due_date: '',
        priority: '',
        assigned_to: ''
    };

    return data;
}

let initialFormSchema = {
    title: '',
    type: 'object',
    properties: {
        message: {
            title: 'Message',
            type: 'string',
            placeholder: 'Enter a message',
        },
        due_date:{
            type: 'string',
            title: 'Due Date'
        },
        priority: {
            type: 'string',
            title: 'Priority',
            enum: ['', 'High','Medium','Low'],
            enumNames: ['Select a value', '1', '2', '3'],
            default: 'High',
        },
        assigned_to: {
            type: 'string',
            title: 'Priority',
            enum: ['', 'Akash','Vikas','Sharma'],
            enumNames: ['Select a User', '1', '2', '3'],
            default: 'High',
        }
    },
};
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
        userPreferenceData
    } = props;
    const [formData, setFormData] = useState({});
    const [widgets] = useState(()=>getWidget());
    const [formSchema] = useState(initialFormSchema);
    const [formUISchema] = useState(initialFormUISchema);
    const [fields] = useState(() => initialFields(props));
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        let data = initialState(userPreferenceData);
        console.log("data",data);
        setFormData(data);
    }, [userPreferenceData])


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
        let { onSubmit, screenId } = props;
        setLoader(true);
        let formData = form.formData;
        console.log(formData)
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

export default CreateTaskForm;