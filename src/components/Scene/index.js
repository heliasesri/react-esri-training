// not supported in 2d => SceneLayer, IntegratedMeshLayer, and PointCloudLayer.
import React, { Component } from 'react';
import { Scene } from '@esri/react-arcgis';
import CreateSearch from '../Search';
import AddFeatureLayer from '../FeatureLayer';
import CreateTrack from '../Track';

import SimpelImageComponent from '../SimpelImage';
import { ReactElementToDomElement } from '../../handy/functions';
import OnViewChanges from '../ViewExtentChanges';

class SceneComponent extends Component {
    state = {
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.updateDimensions);
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
            OnViewChanges(view, this.props.viewProperties)
            CreateSearch(view);
            CreateTrack(view);
            AddFeatureLayer(map, this.props.featureLayer);

            view.ui.add(ReactElementToDomElement(SimpelImageComponent()), {
                position: 'top-right',
                index: 1
            });

            view.ui.add(
                ReactElementToDomElement(this.props.switchComponent()),
                {
                    position: 'top-left',
                    index: 0
                }
            );
        }
    };

    render() {
        const screenSize = this.getScreenSize();

        return (
            <React.Fragment>
                <Scene
                    style={screenSize}
                    class="full-screen-map"
                    mapProperties={{
                        basemap: 'dark-gray',
                        ground: 'world-elevation'
                    }}
                    loaderOptions={{ css: true }}
                    viewProperties={this.props.viewProperties}
                    onLoad={(map, mapView) => {
                        this.getMapAndView(map, mapView);
                        this.loadComponents();
                    }}
                />
            </React.Fragment>
        );
    }
}

export default SceneComponent;
