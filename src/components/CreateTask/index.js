import React, {Fragment} from 'react'
import CreateTaskForm from '../components/Card/Form';
import Header from "../Header";
import "../../resources/formControl.css";
import PageWrapper from '../components/PageWrapper';

export default function CreateTask({isLoading}) {
    return (
        <Fragment>
            <Header title={'Task Manager'} showBackButton={!isLoading}/>
            <PageWrapper showLoader={isLoading}>
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
            </PageWrapper>
        </Fragment>
    );
}



