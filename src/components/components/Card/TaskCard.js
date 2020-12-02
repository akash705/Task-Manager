import React, { Fragment , useState } from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { deleteTask as removeTask } from '../../../store/actionCreators';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import Close from '@material-ui/icons/Close';
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

function TaskCard({ deleteTask, message, users, id , due_date , priority , assigned_to , history } = {}) {
    let { text:ribbonText='' , class:ribbonClass }  = getPriorityText(priority);
    const [loader, setLoader] = useState(false);
    
    function editTask(){
        history.push("/create",{
            id: id
        })
    }

    function removeTask(){
        if(loader){
            return  toast("Request is in process !!!");
        }
        setLoader(true);
        deleteTask(id,(flag)=>{
            if(flag){
                setLoader(false);
            }
        })
    }

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
                    className={`box-shadow-default border-radius-none text-transform-capitalize padding-top-20 font-family-roboto`}>
                    <div
                        className={`ribbon text-center ${ribbonClass} `}
                        style={{
                            minWidth: '75px',
                            width: '75px',
                            maxWidth: '75px',
                            zIndex: 4,
                        }}>
                        <span className="ribbon-text-before" />
                        <span className={'font-14'}>{ ribbonText }</span>
                        <span className="ribbon-text-after" />
                    </div>
                    <div>
                        <Fab
                            className="close-modal-icon position-absolute box-shadow-none border-light-grey"
                            onClick={removeTask}>
                            <Close />
                        </Fab>

                        <CardContent>
                            <div className={`font-18 font-16-xs margin-bottom-4`}>
                                {moment(due_date).diff(moment(),"day") } days left
                            </div>
                            <div className={`font-16 font-14-xs margin-top-4 margin-bottom-4`}>
                                {message}
                            </div>
                            <div className={`font-16 font-14-xs margin-top-4 margin-bottom-4`}>
                                Assigned to : {assigned_to}
                            </div>
                        </CardContent>
                    </div>
                    <CardActions>
                        <Button onClick={editTask} >
                            Edit
                        </Button>
                    </CardActions>
                </Card>
            </div>
        </Fragment>
    );
}

let mapsToProps = (
    { users = {}, userList = [] } = {},
    { assigned_to, id } = {}
) => {
    let index = users[assigned_to];
    return {
        userData: userList[index],
        id: id,
    };
};

function dispatchToProps(dispatch) {
    return {
        deleteTask(payload){
            dispatch(removeTask({payload}));
        } ,
    };
}

export default connect(mapsToProps, dispatchToProps)(withRouter(TaskCard));
