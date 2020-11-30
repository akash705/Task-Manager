import { Component } from 'react'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
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
            <Route path={'/'} component={(props) => <Home {...props} />} />
        </Router>
      </div>
    );
  }
}

export default App;