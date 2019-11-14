import React from 'react';
//import logo from './logo.svg';
import Router from './components/Router';
import { createBrowserHistory } from 'history'

function App() {
    return (
        <React.Fragment>
            <Router history={createBrowserHistory()} />
        </React.Fragment>
    );
}

export default App;
