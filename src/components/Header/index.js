import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core';

export default function index({title}={}) {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <div>
                        <span className={'font-family-roboto font-20 font-18-xs '}>{title}</span>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
