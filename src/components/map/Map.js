import React, { Component } from "react";
import { Map } from "@esri/react-arcgis";
//import { Scene } from "@esri/react-arcgis";
//import WebMap from "esri/WebMap"

/* const styles = {
    mapCss: {
        width: undefined,
        height: undefined
    },
}; */

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

    render() {
        const { screenWidth, screenHeight } = this.state;
        const height = screenHeight;
        const width = screenWidth;
        const screenSize = { height, width };

        return (
            <React.Fragment>
                    <Map
                     style={screenSize}
                        class="full-screen-map"
                        mapProperties={{ basemap: "streets" }}
                        loaderOptions={{ css: true }}
                        //style={this.style.mapCss}
                        viewProperties={{
                            center: [16, 54],
                            zoom: 10
                        }}
                    />
            </React.Fragment>
        );
    }
}

export default MapComponent;
