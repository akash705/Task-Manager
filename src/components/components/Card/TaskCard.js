import React, { Fragment , useState } from 'react';
import {
    Card,
    CardContent,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { deleteTask as removeTask } from '../../../store/actionCreators';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import Close from '@material-ui/icons/Close';
import Edit from '@material-ui/icons/Edit';
import moment from "moment";
import Fab from '@material-ui/core/Fab';


function getPriorityText(priority){
    let obj = {
        text: '',
        class: ''
    }
    if(String(priority) === String(1)){
        obj.text = "High";
        obj.class= "ribbon-high-priority"
    }
    if(String(priority) === String(2)){
        obj.text = "Medium";
        obj.class= "ribbon-medium-priority"
    }
    if(String(priority) === String(3)){
        obj.text = "Low";
        obj.class= "ribbon-low-priority"
    }
    return obj;
}

function getDueDateText(due_date){
    if(!due_date) return { showDueDate: false };
    if(moment(due_date).isSame(moment(),'D')){
        return { showDueDate: true, component: 'Today' , class: 'color-green' }
    }
    else if(!moment(due_date).isAfter(moment())){
        return { showDueDate: true, component: 'Expired' , class: 'color-red' }
    }
    return {
        showDueDate: true,
        component: `${moment(due_date).diff(moment(), 'day')} days left`,
    };
}

function TaskCard({ deleteTask, message, userData, id , due_date , priority ,  history } = {}) {
    let { text:ribbonText='' , class:ribbonClass }  = getPriorityText(priority);
    const [loader, setLoader] = useState(false);
    
    function editTask(){
        if(loader){
            return  toast("Request is in process !!!");
        }
        history.push(`/create/${id}`,{
            id: id
        })
    }

    function removeTask(){
        if(loader){
            return  toast("Request is in process !!!");
        }
        setLoader(true);
        deleteTask(id,({status,error})=>{
            setLoader(false);
            if(!status){
                toast(error);
            }
        })
    }

    let { showDueDate, component, class: componentClass='' } = getDueDateText(
        due_date
    );

    return (
        <Fragment>
            <div
                className={
                    'position-relative margin-top-12-xs margin-bottom-12-xs position-relative task-card'
                }
                style={{}}>
                <Card
                    style={{
                        minHeight: '200px',
                    }}
                    className={`box-shadow-default border-radius-none text-transform-capitalize padding-top-12 font-family-poppins`}>
                    {ribbonText ? (
                        <div
                            className={`ribbon text-center `}
                            style={{
                                minWidth: '75px',
                                width: '75px',
                                maxWidth: '75px',
                                zIndex: 4,
                            }}>
                            <span
                                className={`ribbon-text-before ${ribbonClass}  `}
                            />
                            <span className={'font-14 color-white'}>
                                {ribbonText}
                            </span>
                            <span
                                className={`ribbon-text-after ${ribbonClass} `}
                            />
                        </div>
                    ) : null}
                    <div>
                        <Fab
                            className="close-modal-icon position-absolute box-shadow-none border-light-grey"
                            onClick={removeTask}>
                            <Close />
                        </Fab>

                        <CardContent className={'padding-none'}>
                            <div
                                className={`font-18 font-16-xs margin-bottom-4 font-bold padding-left-24 padding-right-24 padding-left-16-xs padding-right-16-xs`}>
                                {showDueDate ? (
                                    <div className={`${componentClass} font-16 font-14-xs`}>
                                        <div>
                                            { component }
                                        </div>
                                        <div className={'font-10 margin-top-12 color-grey'}>
                                            {moment(due_date).format("MMM Y DD")}
                                        </div>
                                    </div>
                                ) : (
                                    <span>&nbsp;</span>
                                )}
                            </div>
                            <div
                                className={`margin-top-12 margin-bottom-8  padding-left-24 padding-right-24 padding-left-16-xs padding-right-16-xs display-flex`}>
                                <div className={`font-14 white-space-nowrap`}>
                                    Message :
                                </div>
                                <div
                                    className={` font-14 margin-left-8`}
                                    style={{
                                        minHeight: '75px',
                                    }}>
                                    {message}
                                </div>
                            </div>
                            {userData ? (
                                <div
                                    className={`font-14  margin-top-12 margin-bottom-12 padding-left-24 padding-right-24 padding-left-16-xs padding-right-16-xs`}>
                                    <div
                                        className={
                                            'margin-top-8 margin-bottom-8'
                                        }>
                                        Assigned to :
                                    </div>
                                    {userData ? (
                                        <div
                                            className={
                                                'display-flex align-items-center'
                                            }>
                                            <div>
                                                <img
                                                    src={userData.picture}
                                                    alt={userData.name}
                                                    className={
                                                        'border-radius-circle'
                                                    }
                                                    style={{
                                                        height: '75px',
                                                    }}
                                                />
                                            </div>
                                            <div
                                                className={
                                                    'margin-left-12 font-16 font-bold'
                                                }>
                                                {userData.name}
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            ) : null}
                            <Fab
                                className="theme-color-dark box-shadow-none background-none border-light-grey position-absolute"
                                size="small"
                                onClick={editTask}
                                style={{
                                    right: '16px',
                                    bottom: '16px',
                                }}>
                                <Edit />
                            </Fab>
                        </CardContent>
                    </div>
                </Card>
            </div>
        </Fragment>
    );
}

let mapsToProps = (
    { users = {}, usersList = [] }={},
    { assigned_to, id } = {}
) => {
    let index = users[assigned_to];
    return {
        userData: usersList[index],
        id: id,
    };
};

function dispatchToProps(dispatch) {
    return {
        deleteTask(payload,cb){
            dispatch(removeTask({payload , cb}));
        } ,
    };
}

export default connect(mapsToProps, dispatchToProps)(withRouter(TaskCard));
