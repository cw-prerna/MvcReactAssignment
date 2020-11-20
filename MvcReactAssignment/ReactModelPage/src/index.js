import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store  from './reducer/store';
import { mapDispatchToProps, mapStateToProps} from './Actions/cityAction'
import { connect } from "react-redux";
const AppConnect = connect(mapStateToProps,mapDispatchToProps)(App);


ReactDOM.render(
    <Provider store={store}>
      <AppConnect />
    </Provider>,
    document.getElementById('root')
);

reportWebVitals();
