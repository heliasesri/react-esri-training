import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';
/* import { loadModules } from 'esri-loader';
import qs from 'qs'; */
//import axios from 'axios';

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
        /*        auth: false */
    };

    inputRef = React.createRef();
    /* componentWillMount() {
        const hash = qs.parse(window.location.hash.slice(1));
        this.setState({ hash });
        window.history.pushState('', document.title, window.location.pathname);
    } */

    componentDidMount() {
        this.setState({ isDisabled: false });
        this.inputRef.addEventListener('click', this.checkSave);
    }

    componentWillUnmount() {
        this.inputRef.removeEventListener('click', this.checkSave);
    }

    checkSave = () => {
        const { map, view } = this.props;
        const { loading /* , auth */ } = this.state;
        if (!map || !view) return console.log('Map or View is not available.');
        else if (loading) return console.log('Save is still saving.');
        //else if (!auth) this.SignIn();
        else this.saveMap(map, view);
    };

    saveMap = (map, view) => {
        //await this.generateToken();
        //console.log(this.state.token);
        //await this.getItemInfo();
        //await this.updateWebMap();

        /*
            I need this to update:

            f:
            created:
            description:
            extent:
            id:
            modified:
            name:
            owner:
            ownerFolder:
            snippet:
            tags:
            thumbnail:
            tiile:
            type:
            typekeywords:
            url:
            clearEmptyFields:
            text: webmapdata
            token:
        */
        //#region test
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
                                WebMapTrainingReact
                            </a>
                        </i>
                    </React.Fragment>
                );
                this.updateStatusMessage('Save WebMap', info);
            })
            .catch(error => {
                this.updateStatusMessage('Save WebMap', `Error: ${error}`);
            });
        //#endregion
    };

    updateWebMap = () => {
        /* return axios
        .post(
            `https://www.arcgis.com/sharing/rest/content/users/Helias.Breneol/49419c8527cf4fcbb39b5234fcdb880e/items/6ca0bacba6524ef6bb24ec6a56f51be9/update`
        , {
            params: {
                foo: 'bar'
              }
        }
        
        )
        .then(response => {
            if (response.data.token)
                this.setState({ token: response.data.token });
        })
        .catch(error => {
            console.log(error);
        }); */
    };

    /* getItemInfo = async (webmapId, token) => {
        let object = {};

        await axios
            .get(
                `https://www.arcgis.com/sharing/rest/content/items/6ca0bacba6524ef6bb24ec6a56f51be9?token=${this.state.token}&f=json`
            )
            .then(response => {
                object = response.data;
            })
            .catch(error => {
                console.log(error);
            });

        await axios
            .get(
                `https://www.arcgis.com/sharing/rest/content/items/6ca0bacba6524ef6bb24ec6a56f51be9/data?token=${this.state.token}&f=json`
            )
            .then(response => {
                object['webmapData'] = response.data;
            })
            .catch(error => {
                console.log(error);
            });

        console.log(object);
    };

    generateToken = (username, password, expiration, refer) => {
        return axios
            .post(
                'https://www.arcgis.com/sharing/rest/generateToken?request=getToken&username=Helias.Breneol&password=Vatefairefoutre007-&expiration=60&referer=localhost%3A3000&f=json'
            )
            .then(response => {
                if (response.data.token)
                    this.setState({ token: response.data.token });
            })
            .catch(error => {
                console.log(error);
            });
    }; */

    SignIn = () => {
        const { hash } = this.state;
        console.log(hash);
        if (Object.keys(hash).length === 0 && hash.constructor === Object) {
            const clientID = 'QxDhwSEP9KoeKx48';
            const redirect = 'http://localhost:3000';
            const url = `https://www.arcgis.com/sharing/rest/oauth2/authorize?client_id=${clientID}&response_type=token&expiration=20160&redirect_uri=${redirect}`;
            window.open(url, '_blank');
        } else this.setState({ auth: true });
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
