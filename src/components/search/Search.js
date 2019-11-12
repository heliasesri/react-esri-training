/* 
    Doenst need to be a component 
    need to change it in the future

*/

import React, { Component } from "react";
import { loadModules } from "esri-loader";


class SearchComponent extends Component {
    state = {
        search: undefined
    };

    componentDidMount() {
        loadModules(["esri/widgets/Search"])
            .then(([Search]) => {
                var searchWidget = new Search({
                    view: this.props.view
                  });

                  this.props.view.ui.add(searchWidget,{
                    position: "top-right",
                    index: 0
                  })
                this.setState({search: searchWidget})
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {     
        return (
            <React.Fragment>
            </React.Fragment>
        );
    }
}

export default SearchComponent;
