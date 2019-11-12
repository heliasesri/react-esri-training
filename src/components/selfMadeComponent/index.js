import React, { Component } from "react";
import { loadModules } from "esri-loader";

const styles = {
    image: {
        width: 240,
        height: 120
    }
};

class SelfMadeComponent extends Component {
    state = {
        search: undefined
    };

    componentDidMount() {
        loadModules(["esri/widgets/Widget"])
            .then(([Widget]) => {
                var newWidget = new Widget({});

                console.log(newWidget);

                var test = document.getElementById("viewImg");
                

                this.props.view.ui.add(test, {
                    position: "bottom-right",
                    index: 0
                });

                this.props.view.ui.components = ["zoom", "compass"];

                /* 
                default view ui component

                MapView: ["attribution", "zoom"]
                SceneView: ["attribution", "navigation-toggle", "compass", "zoom"]  
              */
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        return (
            <React.Fragment>
                <img
                    id="viewImg"
                    src="https://media.makeameme.org/created/component-component-everywhere.jpg"
                    alt="Smiley face"
                    style={styles.image}
                />
            </React.Fragment>
        );
    }
}

export default SelfMadeComponent;
