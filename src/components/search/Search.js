import React, { Component } from "react";
import { Search } from "@esri/react-arcgis";


class SearchComponent extends Component {

    componentDidMount() {
    
    }

    updateDimensions = () => {

    };

    render() {
        const { screenWidth, screenHeight } = this.state;
        const height = screenHeight;
        const width = screenWidth;
        const screenSize = { height, width };

        return (
            <React.Fragment>
                 
            </React.Fragment>
        );
    }
}

export default SearchComponent;
