import React, { Fragment } from 'react'
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import { connect } from 'react-redux';
import { deleteTask as removeTask } from "../../store/actionCreators";


function TaskCard({
    deleteTask,
    message,
    users,
    id
}={}) {
    console.log(users);
    return (
        <Fragment>
            <div className={'position-relative margin-top-12-xs margin-bottom-12-xs'}>
            <Fab
                className="close-modal-icon position-absolute"
                onClick={()=>deleteTask(id)}>
                <Close />
            </Fab>
            <Card
                className={`box-shadow-default border-radius-none text-transform-capitalize `}>
                <CardContent>
                    <Typography variant="body2" component="p">
                        {message}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
            </div>
        </Fragment>
    );
}

let mapsToProps=( { users={} , userList =[]  } = {} , { assigned_to , id }={} )=>{
    let index = users[assigned_to];
    return {
        userData: userList[index],
        id: id
    }
}

function dispatchToProps(dispatch){
    return {
        deleteTask: (payload) => dispatch(removeTask(payload)),
    };
}

export default connect(mapsToProps,dispatchToProps)(TaskCard)
