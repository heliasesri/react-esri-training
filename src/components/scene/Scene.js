import React, { Component } from "react";
import { Scene } from "@esri/react-arcgis";
import SearchComponent from "../search/Search";



class SceneComponent extends Component {
    state = {
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight
    };

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    updateDimensions = () => {
        this.setState({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight
        });
    };

    getMapAndView = (map, view) => {
         this.setState({ map: map, view: view });
    };

    render() {
        const { screenWidth, screenHeight } = this.state;
        const height = screenHeight * 0.999; //* 0.999 for no scroll to fit in the page
        const width = screenWidth * 0.999;
        const screenSize = { height, width };

        return (
            <React.Fragment>
                <Scene
                    style={screenSize}
                    class="full-screen-map"
                    mapProperties={{ basemap: "dark-gray" ,
                    ground: "world-elevation"}}
                    loaderOptions={{ css: true }}
                    //style={this.style.mapCss}
                    viewProperties={{
                       
                        zoom: 1
                    }}
                    onLoad={this.getMapAndView}
                />
                {(this.state.view && this.state.map) && <SearchComponent view={this.state.view} map={this.state.map}/>}
            </React.Fragment>
        );
    }
}

export default SceneComponent;
