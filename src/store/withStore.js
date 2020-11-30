import { Provider } from 'react-redux';
import store from "./index";

function withStore(Component){
    return (
        <Provider store={store}>
            <Component />
        </Provider>
    )
}

export default withStore;