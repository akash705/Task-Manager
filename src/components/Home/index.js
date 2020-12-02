import { Grid, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchAllTasks, fetchAllUsers } from '../../store/actionCreators';
import { FETCH_ALL_TASKS, FETCH_ALL_USERS } from '../../store/actions';
import TaskCard from '../components/Card/TaskCard';
import PageWrapper from '../components/PageWrapper';
import SearchBar from '../components/SearchBar';
import Header from '../Header';
import NotFoundIcon from "../../resources/svg/not-found.svg";

function notFound() {
    return (
        <div
            style={{
                position: 'absolute',
                left: '0px',
                top: '50%',
                width: '100%',
                textAlign: 'center',
            }}>
            <div className={`margin-bottom-12 font-16 `}>
                <div className={'width-100 text-center'}>
                    <img
                        src={NotFoundIcon}
                        style={{
                            height: '50px',
                        }}
                    />
                </div>
                <div className={'text-center margin-top-8 font-bold'}>
                    No Task Found
                </div>
            </div>
            <Link
                to={`/create`}
                className={'text-decoration-none margin-top-8'}>
                <Button
                    className={'border-none text-decoration-none'}
                    disableRipple={true}>
                    Add Tasks
                </Button>
            </Link>
        </div>
    );
}

function getLayout(tasks) {
    return (
        <Grid container>
            {tasks.map(
                ({ message, due_date, priority, assigned_to, id } = {}) => (
                    <Grid xs={12} sm={6} lg={4} item key={id}>
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

function Home({ tasks = [] , isLoading }) {
    const [inputValue, setInputValue] = useState('');
    const [allTasks, setAllTasks] = useState(tasks);

    // onUpdate

    useEffect(() => {
        if (inputValue) {
            let updatedTasks = tasks.filter(({ message }) =>
                message.includes(inputValue)
            );
            setAllTasks(updatedTasks);
        } else {
            setAllTasks(tasks);
        }
    }, [tasks, inputValue]);

    // onUpdate

    let component = null;

    if (!allTasks.length) {
        component = notFound();
    } else {
        component = <div className={'margin-top-12 '}>
            {getLayout(allTasks)}
        </div>;
    }

    return (
            <div>
                <div className={``}>
                    <Header title={'Task Manager'} showCreateButton={!isLoading} />
                </div>
                <PageWrapper showLoader={isLoading}>
                    <div className={'padding-24 padding-16-xs'}>
                        <div>
                            {tasks ? (
                                <div className={'padding-left-8-xs padding-right-8-xs padding-left-12 padding-right-12'}>
                                    <SearchBar
                                        value={inputValue}
                                        onChange={(value) => setInputValue(value)}
                                        onSubmit={Function.prototype}
                                    />
                                </div>
                            ) : null}
                        </div>
                        <div>{component}</div>
                    </div>
                </PageWrapper>  
                <div className={"position-fixed bottom-0 right-0 font-12 "}>
                    Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
                </div>
            </div>
    );
}

function mapsToProps({ tasks }) {
    return {
        tasks,
    };
}

function dispatchToProps(dispatch) {
    return {
        fetchAllTasks: (cb) =>
            dispatch(fetchAllTasks({ type: FETCH_ALL_TASKS, cb: cb })),
        fetchAllUsers: (cb) =>
            dispatch(fetchAllUsers({ type: FETCH_ALL_USERS, cb: cb })),
    };
}

export default connect(mapsToProps, dispatchToProps)(Home);
