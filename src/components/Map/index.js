import React, { Component } from 'react';
import { Map } from '@esri/react-arcgis';
import CreateSearch from '../Search';
import ReactDOM from 'react-dom';
import SimpelImageComponent from '../SimpelImage';
import AddFeatureLayer from '../FeatureLayer';

class MapComponent extends Component {
    state = {
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);

        /*       this.props.view.ui.components = ["zoom", "compass"]; */
        /* 
                default view ui component
                MapView: ["attribution", "zoom"]
                SceneView: ["attribution", "navigation-toggle", "compass", "zoom"]  
              */
    }

    updateDimensions = () => {
        this.setState({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight
        });
    };

    getScreenSize = () => {
        const { screenWidth, screenHeight } = this.state;
        const height = screenHeight * 0.999; //* 0.999 for no scroll to fit in the page
        const width = screenWidth * 0.999;
        return { height, width };
    };

    getMapAndView = (map, mapView) => {
        this.setState({
            map: map,
            view: mapView,
            showComponent: true
        });
    };

    loadComponents = () => {
        const { view, map } = this.state;
        if (view) {
            CreateSearch(view);
            AddFeatureLayer(map, '6996f03a1b364dbab4008d99380370ed');

            const emptyContainer = document.createElement('div');
            ReactDOM.render(SimpelImageComponent(), emptyContainer);
            view.ui.add(emptyContainer, {
                position: 'top-right',
                index: 1
            });
        }
    };

    render() {
        const screenSize = this.getScreenSize();

        return (
            <React.Fragment>
                <Map
                    style={screenSize}
                    class="full-screen-map"
                    mapProperties={{ basemap: 'streets' }}
                    loaderOptions={{ css: true }}
                    viewProperties={{
                        center: [16, 54],
                        zoom: 5
                    }}
                    onLoad={(map, mapView) => {
                        this.getMapAndView(map, mapView);
                        this.loadComponents();
                    }}
                />
                <button
                
        class="esri-component esri-widget--button esri-widget esri-interactive"
        type="button"
        id="switch-btn"
        value="3D"
      />

                {this.state.showComponent ? (
                    <React.Fragment></React.Fragment>
                ) : null}
            </React.Fragment>
        );
    }
}

export default MapComponent;
