import React, { Component } from 'react';
import { loadModules } from 'esri-loader';

const styles = {
    sidebarDiv: {
        width: '240px',
        padding: '10px',
        height: 'auto'
    },
    overlayDiv: {
        zIndex: 1,
        position: 'fixed',
        margin: 'auto auto',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: '280px',
        height: '180px',
        padding: '10px',
        backgroundColor: 'white',
        border: '1px solid grey'
    },
    esriHeading: {
        marginTop: 0
    },
    littleSpacing: {
        marginBottom: '2em'
    },
    loading: {
        color: 'white',
        width: '18px',
        height: '18px'
    }
};

class ShapefileComponent extends Component {
    state = {
        portalUrl: 'https://www.arcgis.com',
        uploadStatus: ''
    };

    componentDidMount() {
        this.form.addEventListener('change', this.function1);
    }
    componentWillUnmount() {
        this.form.removeEventListener('change', this.function1);
    }

    function1 = event => {
        const fileName = event.target.value.toLowerCase();
        if (fileName.indexOf('.zip') !== -1) {
            this.generateFeatureCollection(fileName);
        } else this.setState({ uploadStatus: 'Add shapefile as .zip file' });
    };

    generateFeatureCollection = fileName => {
        const { portalUrl } = this.state;
        const { view } = this.props;
        let name = fileName.split('.');
        // Chrome and IE add c:\fakepath to the value - we need to remove it
        // see this link for more info: http://davidwalsh.name/fakepath
        name = name[0].replace('c:\\fakepath\\', '');
        this.setState({ uploadStatus: `Loading` });

        let params = {
            name: name,
            targetSR: view.spatialReference,
            maxRecordCount: 10000,
            enforceInputFileSizeLimit: true,
            enforceOutputJsonSizeLimit: true
        };

        // generalize features to 10 meters for better performance
        params.generalize = true;
        params.maxAllowableOffset = 10;
        params.reducePrecision = true;
        params.numberOfDigitsAfterDecimal = 0;

        const myContent = {
            filetype: 'shapefile',
            publishParameters: JSON.stringify(params),
            f: 'json'
        };
        loadModules(['esri/request'])
            .then(([esriRequest]) => {
                esriRequest(
                    portalUrl + '/sharing/rest/content/features/generate',
                    {
                        query: myContent,
                        body: this.form,
                        responseType: 'json'
                    }
                )
                    .then(response => {
                        /* const layerName =
                            response.data.featureCollection.layers[0]
                                .layerDefinition.name; */
                        this.setState({
                            uploadStatus: `Loaded`
                        });

                        this.addShapefileToMap(response.data.featureCollection);
                    })
                    .catch(() => this.errorHandler);
            })
            .catch(err => {
                console.error(err);
            });
    };

    errorHandler = error => {
        this.setState({ uploadStatus: error.message });
    };

    addShapefileToMap = featureCollection => {
        const { map, view } = this.props;
        this.setState({ uploadStatus: `Creation ...` });

        loadModules([
            'esri/layers/FeatureLayer',
            'esri/layers/support/Field',
            'esri/Graphic'
        ])
            .then(([FeatureLayer, Field, Graphic]) => {
                let sourceGraphics = [];
                
                const layers = featureCollection.layers.map((layer) => {
                    const graphics = layer.featureSet.features.map(function(
                        feature
                    ) {
                        return Graphic.fromJSON(feature);
                    });

                    sourceGraphics = sourceGraphics.concat(graphics);
                    const featureLayer = new FeatureLayer({
                        //popupEnabled: false,
                        //objectIdField: 'FID',
                        //url: "https://services.arcgis.com/1WXsSdZFzziTTcic/arcgis/rest/services/WebMapTrainingReactService/FeatureServer/dynamicLayer",
                        source: graphics,
                        title: 'Feature information' /* {0} */,
                        fields: layer.layerDefinition.fields.map(function(
                            field
                        ) {
                            return Field.fromJSON(field);
                        })
                    });
                    this.props.addShapeFile(featureLayer);
                    return featureLayer;
                });

                map.addMany(layers);
                view.goTo(sourceGraphics);

                this.setState({ uploadStatus: '' });
            })
            .catch(err => {
                console.error(err);
            });
    };

    render() {
        return (
            <React.Fragment>
                <form
                    method="post"
                    id="uploadForm"
                    ref={elem => (this.form = elem)}
                    style={styles.sidebarDiv}
                    className="esri-widget"
                >
                    <h4 style={styles.esriHeading} className="esri-heading">
                        Add ShapeFile
                    </h4>
                    <label htmlFor="inFile">
                        <span type="button" className="esri-button">
                            Upload Shapefile
                        </span>
                        <input
                            type="file"
                            name="file"
                            id="inFile"
                            style={{ display: 'none' }}
                        />
                    </label>
                    <br />
                    <div>Status: {this.state.uploadStatus}</div>
                </form>
            </React.Fragment>
        );
    }
}

export default ShapefileComponent;
