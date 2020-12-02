import { Component } from 'react'
import CreateTask from './components/CreateTask';
import Home from "./components/Home";
import "font-awesome/css/font-awesome.min.css"
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import { connect } from 'react-redux';
import { FETCH_ALL_TASKS, FETCH_ALL_USERS } from './store/actions';
import { fetchAllTasks, fetchAllUsers } from './store/actionCreators';
import Preloader from "./resources/svg/preloader.svg";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      loader: true
     };
  }

  componentDidMount(){
    let { fetchAllTasks, fetchAllUsers } = this.props;
    fetchAllTasks()
    fetchAllUsers(({status,error})=>{
        this.setState({loader:false});
        if(!status){
          toast(error)
      }
    })
  }

  static getDerivedStateFromError(nextProps, prevState) {
    return {
      hasError: true
    }
  }

  componentDidCatch(error, info) {
  }

  render() {

    return (
      <div>
        <ToastContainer className={'color-black font-family-poppins'} />
        <Router>
            <Route path={'/'} exact component={(props) => <Home {...props} isLoading={this.state.loader} />} />
            <Route path={'/create/:taskId?'} component={(props) => <CreateTask {...props} isLoading={this.state.loader} />} />
        </Router>
      </div>
    );
  }
}


function dispatchToProps(dispatch){
  return {
      fetchAllTasks: (cb)=>dispatch(fetchAllTasks({type:FETCH_ALL_TASKS , cb: cb})),
      fetchAllUsers: (cb)=>dispatch(fetchAllUsers({type:FETCH_ALL_USERS , cb: cb})),
  }
}

export default connect(null,dispatchToProps)(App);