import React, { Component } from 'react';
import SwitchComponent from '../SwitchDimension';
import MapComponent from '../Map';
import SceneComponent from '../Scene';

class ViewComponent extends Component {
    state = {
        dimension: '2D',
        featureLayer: [
            'a79a3e4dc55343b08543b1b6133bfb90',
            '6996f03a1b364dbab4008d99380370ed' // order the layer
        ],
        viewProperties: {
            center: [4.27583, 50.80474], //lon , lat
            zoom: 6
        }
    };

    changeDimenion = () => {
        this.setState({
            dimension: this.state.dimension === '2D' ? '3D' : '2D'
        });
    };

    switch = () => (
        <SwitchComponent
            dimension={this.state.dimension}
            changeFunction={this.changeDimenion}
        />
    );

    updateStatevViaProps = (state, props) => {
        this.setState({ [state]: props });
    };

    showView = () => {
        switch (this.state.dimension) {
            case '2D':
                return (
                    <MapComponent
                        switchComponent={this.switch}
                        featureLayer={this.state.featureLayer}
                        viewProperties={this.state.viewProperties}
                        updateStatevViaProps={this.updateStatevViaProps}
                    />
                );
            case '3D':
                return (
                    <SceneComponent
                        switchComponent={this.switch}
                        featureLayer={this.state.featureLayer}
                        viewProperties={this.state.viewProperties}
                    />
                );
            default:
                return <div>We searching you map</div>;
        }
    };

    render() {
        return <React.Fragment>{this.showView()}</React.Fragment>;
    }
}

export default ViewComponent;
