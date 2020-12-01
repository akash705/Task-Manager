import { Component } from 'react'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import CreateTask from './components/CreateTask';
import Home from "./components/Home";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false
     };
  }

  static getDerivedStateFromError(nextProps, prevState) {
    console.log(nextProps,prevState)
    return {
      hasError: true
    }
  }

  componentDidCatch(error, info) {
    console.log({error,info});
  }

  render() {
    return (
      <div>
        <Router>
            <Route path={'/'} exact component={(props) => <Home {...props} />} />
            <Route path={'/create'} exact component={(props) => <CreateTask {...props} />} />
        </Router>
      </div>
    );
  }
}

export default App;