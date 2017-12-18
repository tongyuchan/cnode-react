import 'babel-polyfill';    //this will emulate a full ES6 environment
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter , Route } from 'react-router-dom';

import './scss/index.scss';
import store from './store';
import Nav from './containers/Nav';
import Detail from './containers/Detail'

render(
    <Provider store={store}>
        <HashRouter>
            <div>
                <Route path="/" exact component={Nav}/>
                <Route path="/topic/:id" component={Detail}/>
            </div>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);