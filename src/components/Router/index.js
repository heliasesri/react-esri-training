import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MapComponent from '../Map';
import SceneComponent from '../Scene';
import NotFoundPage from '../NotFoundPage';
import ViewComponent from '../View';

class Router extends Component {
    state = {
        position: undefined,
        mode: undefined
    };

    render() {
        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Switch>
                    <Route
                        
                        exact
                        
                        path="(/|/view|/home)"
                        component={() => <ViewComponent {...this.props}/>}
                        
                    />
                    <Route
                        exact
                        path="(/map)"
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
