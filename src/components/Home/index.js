import { Button } from '@material-ui/core';
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
import Masonry from "react-masonry-css"
import FilterComponent from '../components/FilterComponent/FilterComponent';
import moment from "moment";

function notFound() {
    return (
        <div
            style={{
                position: 'absolute',
                left: '0px',
                top: '50%',
                width: '100%',
                textAlign: 'center',
                transform: "translate(0,-50%)"
            }}>
            <div className={`margin-bottom-12 font-16 `}>
                <div className={'width-100 text-center'}>
                    <img
                        src={NotFoundIcon}
                        style={{
                            height: '50px',
                        }}
                        alt={'Not found'}
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
                    className={'border-none text-decoration-none theme-primary-background color-white padding-left-24 padding-right-24 border-radius-none'}
                    disableRipple={true}>
                    Add Tasks
                </Button>
            </Link>
        </div>
    );
}
const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 2,
    500: 1,
};
function getLayout(tasks) {
    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {tasks.map(
                ({ message, due_date, priority, assigned_to, id } = {}) => (
                    <div key={id} className={` margin-top-none-xs margin-bottom-16-xs`}>
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
                    </div>
                )
            )}
            </Masonry>
    );
}

function Home({ tasks = [] , isLoading }) {
    const [inputValue, setInputValue] = useState('');
    const [allTasks, setAllTasks] = useState(tasks);
    const [filter, setFilter] = useState(tasks);
  
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
        if(filter){
            setFilter(false);
        }
    }, [tasks, inputValue]);

    // onUpdate

    //  filter Area

    function applyFilter(filterValue){
        if(tasks.length){
            let {
                assigned_to: filter_assigned_to,
                due_date: filter_due_date,
                priority: filter_priority,
            } = filterValue;
            let updatedTask=tasks;
            if(filter_assigned_to || filter_due_date || filter_priority){
                updatedTask = tasks.filter(
                    ({ assigned_to, due_date, priority  }) => {
                        if(filter_assigned_to){
                            if(filter_assigned_to !== assigned_to){
                                return false
                            }
                        }
                        if(filter_due_date){
                            if(!moment(filter_due_date).isSame(due_date,'D')){
                                return false;
                            }
                        }
                        if(filter_priority){
                            if(String(filter_priority) !== String(priority)){
                                return false;
                            }
                        }
                        return true;
                    }
                );
                setFilter(filterValue);
            }else{
                setFilter(false);
            }
            setAllTasks(updatedTask)
        }
    }

    function resetFilter(){
        setFilter();
        setAllTasks(tasks);
    }


    // filter Area




    let component = null;

    if (!allTasks.length) {
        component = notFound();
    } else {
        component = <div className={'margin-top-12 margin-top-4-xs'}>
            {getLayout(allTasks)}
        </div>;
    }

    return (
        <div>
            <div className={``}>
                <Header
                    title={'Task Manager'}
                    showCreateTaskButton={!isLoading && tasks && tasks.length}
                    showReloadButton={!isLoading}
                />
            </div>
            <PageWrapper showLoader={isLoading}>
                <div className={'padding-24 padding-16-xs'}>
                    <div>
                        {tasks && tasks.length ? (
                            <div
                                className={
                                    'padding-left-8-xs padding-right-8-xs padding-left-12 padding-right-12'
                                }>
                                <SearchBar
                                    value={inputValue}
                                    onChange={(value) => setInputValue(value)}
                                    onSubmit={Function.prototype}
                                />
                            </div>
                        ) : null}
                    </div>
                    {tasks && tasks.length ? (
                        <div
                            className={
                                'margin-top-12 margin-bottom-12 text-right margin-top-4-xs margin-bottom-4-xs'
                            }>
                            <FilterComponent
                                applyFilter={applyFilter}
                                resetFilter={resetFilter}
                                filterValue={filter}
                            />
                        </div>
                    ) : null}
                    <div>{component}</div>
                </div>
            </PageWrapper>
            <div
                className={
                    'position-fixed bottom-0 right-0 font-12 display-none-xs'
                }>
                Icons made by{' '}
                <a
                    href="https://www.flaticon.com/authors/pixel-perfect"
                    title="Pixel perfect">
                    Pixel perfect
                </a>{' '}
                from{' '}
                <a href="https://www.flaticon.com/" title="Flaticon">
                    {' '}
                    www.flaticon.com
                </a>
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
