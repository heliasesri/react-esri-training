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
                    position: "top-left",
                    index: 2
                  })
                //this.setState({search: searchWidget})
            })
            .catch(err => {
                console.error(err);
            });
    }

    updateDimensions = () => {};

    render() {
        const { search } = this.state;
        const SearchIWantToCreate = search;
     
        return (
            <React.Fragment>
                {this.state.search &&  console.log(search)}
               
            </React.Fragment>
        );
    }
}

export default SearchComponent;
