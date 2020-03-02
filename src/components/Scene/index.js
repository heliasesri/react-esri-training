// not supported in 2d => SceneLayer, IntegratedMeshLayer, and PointCloudLayer.
import React, { Component } from 'react';
import { WebScene } from '@esri/react-arcgis';
import CreateSearch from '../Search';
import AddFeatureLayer from '../FeatureLayer';
import CreateTrack from '../Track';

import SimpelImageComponent from '../SimpelImage';
import { ReactElementToDomElement } from '../../handy/functions';
import OnViewChanges from '../ViewExtentChanges';
import AddExpand from '../Expand';
import ShapefileComponent from '../Shapefile';
import CreateBaseMapGallery from '../BasemapGallery';
import SaveWebMapComponent from '../SaveWebMap';

class SceneComponent extends Component {
    state = {
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
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
            OnViewChanges(view, this.props.viewProperties);
            CreateSearch(view);
            CreateTrack(view);
            AddFeatureLayer(map, this.props.featureLayer);

            AddExpand(view, ReactElementToDomElement(SimpelImageComponent()));

            let basemapGalleryPromises = CreateBaseMapGallery(view);
            basemapGalleryPromises.then(function(result) {
                AddExpand(view, result, 'esri-icon-basemap');
            });

            

            view.ui.add(
                ReactElementToDomElement(this.props.switchComponent()),
                {
                    position: 'top-left',
                    index: 0
                }
            );
            const _ShapefileComponent = (
                <ShapefileComponent view={view} map={map} />
            );
            AddExpand(
                view,
                ReactElementToDomElement(_ShapefileComponent),
                'esri-icon-plus-circled'
            );

            const _SaveWebMapComponent = (
                <SaveWebMapComponent
                    history={this.props.history}
                    view={view}
                    map={map}
                />
            );
            AddExpand(
                view,
                ReactElementToDomElement(_SaveWebMapComponent),
                'esri-icon-save'
            );
        }
    };

    render() {
        const screenSize = this.getScreenSize();

        return (
            <React.Fragment>
                <WebScene
                    id="2b8ae801e0cc43f5a7b4b1f6f4d9b579"
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
