import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core';

export default function index({title}={}) {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" >
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}
