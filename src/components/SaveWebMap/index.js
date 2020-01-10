import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';

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
    }

    componentWillUnmount() {
        this.inputRef.removeEventListener('click', this.checkSave);
    }

    checkSave = () => {
        const { map, view } = this.props;
        const { loading } = this.state;
        if (!map || !view) return console.log('Map or View is not available.');
        else if (loading) return console.log('Save is still saving.');
        else this.saveMap(map, view);
    };

    saveMap = (map, view) => {
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
                    {showStatus && (
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
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default SaveWebMapComponent;
