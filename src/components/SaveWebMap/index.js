import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';

import {
    generateToken,
    createService,
    addDefinition,
    addFeatures
} from '../../handy/rest api';

const styles = {
    sidebarDiv: {
        width: '240px',
        padding: '10px',
        height: 'auto'
    },
    overlayDiv: {
        zIndex: 1,
        //position: 'fixed',
        margin: 'auto auto',
        inset: '0px',
        width: '280px',
        //height: '180px',
        padding: '10px',
        backgroundColor: 'white',
        border: '1px solid grey',
        marginTop: '35%'
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
    },
    fixedPosition: {
        position: 'fixed',
        inset: '0px'
    }
};

class SaveWebMapComponent extends Component {
    state = {
        isDisabled: true,
        headStatus: '',
        infoStatus: '',
        showStatus: false,
        loading: false
    };

    inputRef = React.createRef();

    componentDidMount() {
        this.setState({ isDisabled: false });
        this.inputRef.addEventListener('click', this.checkSave);
        console.log(this.props.map);
    }

    componentWillUnmount() {
        this.inputRef.removeEventListener('click', this.checkSave);
    }

    checkSave = () => {
        const { map, view, getShapeFileContainer } = this.props;
        const { loading } = this.state;
        const container = getShapeFileContainer();

        if (!map || !view) return console.log('Map or View is not available.');
        else if (loading) return console.log('Save is still saving.');
        else if (container.length > 0) this.serviceCreationProcess(container);
        else this.saveMap(map, view);
    };

    serviceCreationProcess = async shapeFileContainer => {
        const serviceAndToken = await this.createService();
        if (serviceAndToken) {
            let result = true;
            let serviceLayerList = [];
            for (const layer of shapeFileContainer) {
                const serviceLayer = await this.createServiceLayer(
                    serviceAndToken,
                    layer
                );

                const featuresAdded = await this.addFeaturesToService(
                    serviceAndToken,
                    serviceLayer,
                    layer
                );

                serviceLayerList.push({ serviceLayer, layer });
                result = featuresAdded ? result : false;
            }

            if (result) this.updateCurrentShapeFile(serviceLayerList);
        } else {
            return;
        }
    };

    createService = async () => {
        const token = await generateToken(
            'Helias.Breneol',
            'Vatefairefoutre007-'
        );

        if (!token) {
            this.updateStatusMessage(
                'Save WebMap',
                `Error: Unable to have token`
            );
            return false;
        }
        const serviceURL = await createService(token);
        if (!serviceURL) {
            this.updateStatusMessage(
                'Save WebMap',
                `Error: Unable to create service`
            );
            return false;
        }

        return { serviceURL, token };
    };

    createServiceLayer = async (serviceAndToken, layer) => {
        const token = serviceAndToken.token;
        const service = serviceAndToken.serviceURL;
        const serviceLayer = await addDefinition(token, service, layer);

        if (serviceLayer.layerURL === false) {
            return false;
        } else if (serviceLayer) {
            console.log(serviceLayer);
            return serviceLayer;
        }
    };

    addFeaturesToService = async (serviceAndToken, serviceLayer, layer) => {
        let featuresAdded = false;
        if (serviceLayer)
            featuresAdded = await addFeatures(
                serviceLayer,
                serviceAndToken.token,
                layer
            );
        if (!featuresAdded) {
            this.updateStatusMessage(
                'Save WebMap',
                `Error: Unable to the add features`
            );
        }

        return featuresAdded;
    };

    updateCurrentShapeFile = serviceLayerList => {
        const { map, view } = this.props;
        let shapeFileContainer = this.props.getShapeFileContainer();

        for (let i = 0; i < shapeFileContainer.length; i++) {
            shapeFileContainer[i].url = serviceLayerList[i].serviceLayer;
        }

        this.saveMap(map, view);
    };

    saveMap = async (map, view) => {
        map.updateFrom(view);
        map.save()
            .then(item => {
                var itemPageUrl =
                    item.portal.url + '/home/item.html?id=' + item.id;
                var info = (
                    <React.Fragment>
                        Successfully saved:{' '}
                        <i>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={itemPageUrl}
                            >
                                WebMap
                            </a>
                        </i>
                    </React.Fragment>
                );
                this.updateStatusMessage('Save WebMap', info);
            })
            .catch(error => {
                this.updateStatusMessage('Save WebMap', `Error: ${error}`);
                console.log(error);
            });
    };

    handleChange = event => {
        this.setState({ inputValue: event.target.value });
    };

    updateStatusMessage = (head, info) => {
        this.setState({
            headStatus: head,
            infoStatus: info,
            showStatus: true,
            loading: false
        });
    };

    render() {
        const {
            isDisabled,
            headStatus,
            infoStatus,
            showStatus,
            loading
        } = this.state;
        return (
            <React.Fragment>
                <div
                    id="sidebarDiv"
                    style={styles.sidebarDiv}
                    className="esri-widget"
                >
                    <h4 style={styles.esriHeading} className="esri-heading">
                        Save WebMap
                    </h4>
                    <span
                        type="button"
                        value="Save"
                        disabled={isDisabled}
                        className="esri-button"
                        ref={input => {
                            this.inputRef = input;
                        }}
                    >
                        {loading ? (
                            <CircularProgress
                                style={styles.loading}
                                color="inherit"
                            />
                        ) : (
                            <>Save</>
                        )}
                    </span>
                </div>

                {showStatus && (
                    <div style={styles.fixedPosition}>
                        <div
                            id="overlayDiv"
                            style={styles.overlayDiv}
                            className="esri-widget"
                        >
                            <h4
                                style={styles.esriHeading}
                                className="esri-heading"
                            >
                                {headStatus}
                            </h4>
                            <div style={styles.littleSpacing}>{infoStatus}</div>

                            <input
                                type="button"
                                value="OK"
                                className="esri-button"
                                onClick={() => {
                                    this.setState({ showStatus: false });
                                }}
                            />
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

export default SaveWebMapComponent;
