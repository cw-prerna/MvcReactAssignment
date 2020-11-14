import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
import reportWebVitals from './reportWebVitals';

import { createStore } from "redux";
import { Provider } from "react-redux";
import { RootReducer } from './reducer/RootReducer';


const store = createStore(RootReducer);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
);

reportWebVitals();
