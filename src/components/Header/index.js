import React from 'react'
import { AppBar, Toolbar } from '@material-ui/core';
import ArrowLeft from '@material-ui/icons/ArrowBack';
import CreateIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

export default function index({title , showBackButton , showCreateButton}={}) {
    return (
        <div>
            <AppBar position="static">
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
                                'font-family-roboto font-20 font-18-xs '
                            }>
                            {title}
                        </span>
                        {showCreateButton ? (
                            <Link to={'/create'} className={'text-decoration-none color-white margin-top-4 right-0 position-absolute margin-right-8-xs  margin-right-32'}>
                                <CreateIcon
                                    className={'cursor-pointer margin-right-8 border-radius-circle border-light-grey'}
                                />
                            </Link>
                        ) : null}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
