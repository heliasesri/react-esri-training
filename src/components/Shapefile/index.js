import React, { Component } from 'react';
import { loadModules } from 'esri-loader';

import { Paper, Grid, Typography, Input, Button } from '@material-ui/core';

const styles = {
    Paper: {
        padding: '1em'
    },
    Container: {
        minWidth: '300px'
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
        this.setState({ uploadStatus: `Loading - ${name}` });

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
                        const layerName =
                            response.data.featureCollection.layers[0]
                                .layerDefinition.name;
                        this.setState({
                            uploadStatus: `Loaded - ${layerName}`
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
                const layers = featureCollection.layers.map(function(layer) {
                    const graphics = layer.featureSet.features.map(function(
                        feature
                    ) {
                        return Graphic.fromJSON(feature);
                    });
                    sourceGraphics = sourceGraphics.concat(graphics);
                    const featureLayer = new FeatureLayer({
                        //popupEnabled: false,
                        objectIdField: 'FID',
                        source: graphics,
                        fields: layer.layerDefinition.fields.map(function(
                            field
                        ) {
                            return Field.fromJSON(field);
                        })
                    });
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
                <Paper style={styles.Paper}>
                    <form
                        method="post"
                        id="uploadForm"
                        ref={elem => (this.form = elem)}
                    >
                        <Grid
                            style={
                                styles.Container
                            } /* container spacing={1} alignItems="flex-start" */
                        >
                            <Grid item xs={12}>
                                <Typography variant="h5">
                                    Add ShapeFile
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    component="label"
                                >
                                    Upload Shapefile
                                    <Input
                                        type="file"
                                        name="file"
                                        id="inFile"
                                        style={{ display: 'none' }}
                                    />
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom>
                                    Status: {this.state.uploadStatus}
                                </Typography>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </React.Fragment>
        );
    }
}

export default ShapefileComponent;
