import React, { Component } from 'react';
import { Map } from '@esri/react-arcgis';
import CreateSearch from '../Search';

import SimpelImageComponent from '../SimpelImage';
import AddFeatureLayer from '../FeatureLayer';
import { ReactElementToDomElement } from '../../handy/functions';
import CreateTrack from '../Track';

import PropTypes from 'prop-types';
import OnViewChanges from '../ViewExtentChanges';
import AddExpand from '../Expand';
import SaveMap from '../Save';

class MapComponent extends Component {
    static propTypes = {
        featureLayer: PropTypes.array,
        switchComponent: PropTypes.func.isRequired,
        viewProperties: PropTypes.object.isRequired
    };

    state = {
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        dimension: '2D'
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
            AddExpand(view, ReactElementToDomElement(SimpelImageComponent()));
            var test = <SaveMap view={view} map={map} />
            console.log("ici")
          
            AddExpand(view, ReactElementToDomElement(test));
            AddFeatureLayer(map, this.props.featureLayer);

            view.ui.add(
                ReactElementToDomElement(this.props.switchComponent()),
                {
                    position: 'top-left',
                    index: 0
                }
            );

         /*    view.ui.add(
                ReactElementToDomElement(test),
                {
                    position: 'top-right',
                    
                }
            ); */
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

export default MapComponent;
