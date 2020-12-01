import { Grid , Button } from '@material-ui/core';
import { useEffect , useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllTasks, fetchAllUsers } from '../../store/actionCreators';
import { FETCH_ALL_TASKS , FETCH_ALL_USERS } from '../../store/actions';
import TaskCard from '../Card/TaskCard';
import Header from '../Header';

function notFound(){
    return (
        <div style={{
            position: 'absolute',
            left: '0px',
            top: '50%',
            width: '100%',
            textAlign: 'center'
        }}>
            <div className={`margin-bottom-12 font-16 `}>
                No Task Found
            </div>
            <Link to={`/create`} className={'text-decoration-none margin-top-8'}>
                <Button variant="flag" className={'border-none text-decoration-none'} disableRipple={true}>
                    Add Tasks
                </Button>
            </Link>
        </div>
    )
}

function getLayout(tasks){
    console.log(tasks);
    return (
        <Grid container>
            {tasks.map(
                ({ message, due_date, priority, assigned_to, id } = {}) => (
                    <Grid xs={12} sm={6} lg={4} item key={message}>
                        <div
                            className={
                                'padding-left-8-xs padding-right-8-xs padding-left-12 padding-right-12'
                            }>
                            <TaskCard
                                message={message}
                                due_date={due_date}
                                priority={priority}
                                assigned_to={assigned_to}
                                id={id}
                            />
                        </div>
                    </Grid>
                )
            )}
        </Grid>
    );
}


function Home({
    tasks=[],
    fetchAllTasks,
    fetchAllUsers,
}) {
    const [loader, setLoader] = useState(true);
    // cdm

    useEffect(() => {
        fetchAllTasks()
        fetchAllUsers(()=>{
            setLoader(false)
        })
    }, [fetchAllTasks, fetchAllUsers]);

    let component = null;

    if(loader )/*!hasFetchedTasks || !hasFetchedUsers */{
        component =  "Loading ...";
    }
    else if(!tasks.length){
        component =  notFound();
    }else {
        component = getLayout(tasks);
    }

    return (
        <div>
            <Header title={'Task Manager'} showCreateButton={true}/>
            <div className={'padding-24 padding-16-xs'}>
                {component}
            </div>
        </div>
    );
}

function mapsToProps({ tasks,hasFetchedTasks,
    hasFetchedUsers }) {
    return {
        tasks
    };
}

function dispatchToProps(dispatch){
    return {
        fetchAllTasks: (cb)=>dispatch(fetchAllTasks({type:FETCH_ALL_TASKS , cb: cb})),
        fetchAllUsers: (cb)=>dispatch(fetchAllUsers({type:FETCH_ALL_USERS , cb: cb})),
    }
}


export default connect(mapsToProps , dispatchToProps)(Home);
