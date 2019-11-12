import React from "react";
//import logo from './logo.svg';
import "./App.css";
import MapComponent from "./components/map/Map";
import SceneComponent from "./components/scene/Scene";

function App() {
    return (
        <React.Fragment>
            <MapComponent />
            <SceneComponent />
        </React.Fragment>
    );
}

export default App;
