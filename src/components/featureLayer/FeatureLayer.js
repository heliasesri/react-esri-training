import React, { Component } from "react";
import { loadModules } from "esri-loader";

class FeatureLayerComponent extends Component {
    state = {
        search: undefined
    };

    componentDidMount() {
        loadModules(["esri/layers/FeatureLayer"])
            .then(([FeatureLayer]) => {
                var featureLayer = new FeatureLayer({
                    portalItem: {
                        id: "6996f03a1b364dbab4008d99380370ed"
                    }
                });

                //console.log(this.props)
                this.props.map.add(featureLayer);
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        return <React.Fragment></React.Fragment>;
    }
}

export default FeatureLayerComponent;
