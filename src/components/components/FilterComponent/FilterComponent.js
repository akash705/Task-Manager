import {
    Button,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Menu,
    MenuItem,
    Select,
    Switch,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import React, { Fragment, useState } from 'react';
import FilterForm from './FilterForm';

export default function FilterComponent(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function applyFilter(formData){
        handleClose(null);
        props.applyFilter(formData);
    }
    function resetFilter(formData){
        handleClose(null);
        props.resetFilter(formData);
    }


    return (
        <div
            className={'text-right'}
            style={{
                background: 'white',
            }}>
            <div>
                <Button
                    className={'background-none border-radius-none'}
                    disableRipple={false}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}>
                    <MenuIcon />
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted={false}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}>
                    <FilterForm onSubmit={applyFilter} onReset={resetFilter} formValue={props.filterValue} />
                </Menu>
            </div>
        </div>
    );
}
