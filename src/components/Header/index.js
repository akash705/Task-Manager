import React, { useState } from 'react';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import ArrowLeft from '@material-ui/icons/ArrowBack';
import CreateIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import { FETCH_ALL_TASKS, FETCH_ALL_USERS } from '../../store/actions';
import { fetchAllTasks, fetchAllUsers } from '../../store/actionCreators';
import { connect } from 'react-redux';

function Index({title , showBackButton , showCreateTaskButton , showReloadButton , fetchAllTasks:fetchTasks , fetchAllUsers:fetchUsers }={}) {
    const [isSpinning, setSpinnerState] = useState(false);
    function setSpinner(){
        if(isSpinning){
            return 0;
        }
        setSpinnerState(true);
        fetchTasks()
        fetchUsers(()=>{
            setSpinnerState(false);
        })
    }
    return (
        <div>
            <AppBar position="static" className={`theme-primary-background`}>
                <Toolbar>
                    <div className={`display-flex align-items-center width-100 padding-left-8-xs padding-right-8-xs padding-left-12 padding-right-12`}>
                        {showBackButton ? (
                            <Link to={'/'} className={'text-decoration-none color-white margin-top-4'}>
                                <ArrowLeft
                                    className={'cursor-pointer margin-right-8'}
                                />
                            </Link>
                        ) : null}
                        <span
                            className={
                                'font-family-poppins font-20 font-18-xs '
                            }>
                            {title}
                        </span>
                        {showCreateTaskButton ? (
                            <Link to={'/create'} className={'text-decoration-none color-white margin-top-4 right-0 position-absolute margin-right-8-xs  margin-right-32'}>
                                <CreateIcon
                                    className={'cursor-pointer margin-right-8 border-radius-circle border-light-grey'}
                                />
                            </Link>
                        ) : null}
                        {showReloadButton ? (
                            <Button className={'text-decoration-none color-white  margin-top-4 background-transparent color-white position-absolute right-0 margin-right-32-xs margin-right-40 font-20'}
                            onClick={setSpinner}
                            disableRipple={false}>
                                <i
                                    className={
                                        `color-white fa fa-refresh font-20 margin-left-8 margin-right-12 ${isSpinning ? 'fa-spin fa-3x': ''} `
                                    }
                                />
                            </Button>
                        ) : null}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

function dispatchToProps(dispatch) {
    return {
        fetchAllTasks: (cb) =>
            dispatch(fetchAllTasks({ type: FETCH_ALL_TASKS, cb: cb })),
        fetchAllUsers: (cb) =>
            dispatch(fetchAllUsers({ type: FETCH_ALL_USERS, cb: cb })),
    };
}

export default connect( null,dispatchToProps )(Index);