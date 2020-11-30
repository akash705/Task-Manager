import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import TaskCard from '../Card';
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
            Nothing found
        </div>
    )
}


function Home({
    tasks=[]
}) {
    return (
        <div>
            <Header title={'Task Manager'} />
            <div className={'padding-24 padding-16-xs'}>
                {tasks.length ? (
                    <Grid container>
                        {tasks.map(
                            ({
                                message,
                                due_date,
                                priority,
                                assigned_to,
                                id,
                            } = {}) => (
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
                ) : (
                    notFound()
                )}
            </div>
        </div>
    );
}

function mapsToProps({ tasks }) {
    return {
        tasks,
    };
}


export default connect(mapsToProps)(Home);
