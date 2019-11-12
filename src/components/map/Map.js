import React, { Component } from "react";
import { Map } from "@esri/react-arcgis";
import SearchComponent from "../search/Search";
import FeatureLayer from "../featureLayer/FeatureLayer";

/* const styles = {
    mapCss: {
        width: undefined,
        height: undefined
    },
};
 */
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
        this.setState({ map: map, view: view });
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
                    //style={this.style.mapCss}
                    viewProperties={{
                        center: [16, 54],
                        zoom: 10
                    }}
                    onLoad={this.getMapAndView}
                />
                {this.state.view && this.state.map && (
                    <React.Fragment>
                        <SearchComponent
                            view={this.state.view}
                            map={this.state.map}
                        />
                        <FeatureLayer
                            view={this.state.view}
                            map={this.state.map}
                        ></FeatureLayer>
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

export default MapComponent;
