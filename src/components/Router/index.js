import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MapComponent from '../Map';
import SceneComponent from '../Scene';
import NotFoundPage from '../NotFoundPage';

class Router extends Component {
    state = {
        position: undefined,
        mode: undefined
    };

/*     componentDidMount()
    {
        console.log(this.props.history.push())
   
    } */

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        exact
                        path="(/|/map)"
                        component={() => <MapComponent />}
                    />
                    <Route
                        exact
                        path="/scene"
                        component={() => <SceneComponent />}
                    />
                    <Route component={() => <NotFoundPage />} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;
