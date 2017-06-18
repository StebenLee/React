import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { fromJS } from 'immutable';
//routing folder
import routes from "../common/routes";
import configureStor from '../common/store/configureStore';
import { checkAuth } from '../common/actions';

//rehydration
const initialState = window.__PRELOADED_STATE__;

//initialState -> store -> provider
const store = configureStore(fromJS(initialState));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);