import React, {Fragment} from 'react'
import CreateTaskForm from '../components/Card/Form';
import Header from "../Header";
import "../../resources/formControl.css";

export default function CreateTask() {
    return (
        <Fragment>
            <Header title={'Task Manager'} showBackButton={true}/>
            <div
                className={'box-shadow-default padding-16'}
                style={{
                    maxWidth: '600px',
                    display: 'block',
                    margin: 'auto',
                    height: "100vh"
                }}>
                    <CreateTaskForm />
            </div>
        </Fragment>
    );
}



