import React, { Component } from "react";
import { Map } from "@esri/react-arcgis";
import CreateSearch from "../search/Search";

class MapComponent extends Component {
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
        this.setState({
            map: map,
            view: view,
            isUpdate: true
        });
    };

    loadComponents = () => {
        this.state.isUpdate && CreateSearch(this.state.view);
    };

    render() {
        const { screenWidth, screenHeight } = this.state;
        const height = screenHeight * 0.999; //* 0.999 for no scroll to fit in the page
        const width = screenWidth * 0.999;
        const screenSize = { height, width };

        return (
            <React.Fragment>
                <Map
                    style={screenSize}
                    class="full-screen-map"
                    mapProperties={{ basemap: "streets" }}
                    loaderOptions={{ css: true }}
                    viewProperties={{
                        center: [16, 54],
                        zoom: 10
                    }}
                    onLoad={this.getMapAndView}
                />

                {this.loadComponents()}
            </React.Fragment>
        );
    }
}

export default MapComponent;
