import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';
import { loadModules } from 'esri-loader';
import qs from 'qs';

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
        loading: false,
        auth: false
    };

    inputRef = React.createRef();

    componentDidMount() {
        console.log(this.props.map.operationalLayers);
        console.log(this.props.map.layers.toJSON());
        console.log(this.props);
        this.setState({ isDisabled: false });
        this.inputRef.addEventListener('click', this.checkSave);
    }

    componentWillUnmount() {
        this.inputRef.removeEventListener('click', this.checkSave);
    }

    componentDidUpdate(prevProps) {
        //console.log(prevProps)
        if (this.props.map !== prevProps.map) {
            console.log(this.props.map);
        }
        if (this.props.view !== prevProps.view) {
            console.log(this.props.view);
        }
    }

    checkSave = () => {
        const { map, view } = this.props;
        const { loading, auth } = this.state;
        if (!map || !view) return console.log('Map or View is not available.');
        else if (loading) return console.log('Save is still saving.');
        //else if (!auth) this.SignIn();
        else this.saveMap(map, view);
    };

    saveMap = (map, view) => {
        this.setState({ loading: true });

        loadModules([
            'esri/identity/OAuthInfo',
            'esri/identity/IdentityManager',
            'esri/request'
        ])
            .then(([OAuthInfo, esriId, esriRequest]) => {
                var info = new OAuthInfo({
                    // Swap this ID out with a registered application ID
                    appId: 'QxDhwSEP9KoeKx48', //"zGdHIKswBSKahg18", 7dRnhUjZOAr983va
                    // Uncomment the next line and update if using your own portal
                    // portalUrl: 'https://esribelux.maps.arcgis.com/sharing',
                    // Uncomment the next line to prevent the user's signed in state from being shared with other apps on the same domain with the same authNamespace value.
                    // authNamespace: "portal_oauth_inline",
                    popup: true,
                    preserveUrlHash: true,
                    popupCallbackUrl: ''
                });

                esriId.registerOAuthInfos([info]);
                //esriId.useSignInPage = false
                //esriId.checkSignInStatus()
                console.log(esriId.useSignInPage);
                //esriId.getCredential(info.portalUrl + "/sharing");
                console.log(esriRequest)
                console.log(map.save)

                /* esriRequest(
                    'https://www.arcgis.com/sharing/rest/generateToken?request=getToken&username=Helias.Breneol&password=Vatefairefoutre007-&expiration=60&referer=localhost%3A3000&f=json'
                ).then(response => {
                    // The requested data
                    console.log(response);
                    //var geoJson = response.data;
                }); */

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
                        this.updateStatusMessage(
                            'Save WebMap',
                            `Error: ${error}`
                        );
                    });
            })
            .catch(err => {
                console.error(err);
            });
    };

    SignIn = () => {
        const hash = qs.parse(window.location.hash.slice(1));
        console.log(hash);
        const clientID = 'QxDhwSEP9KoeKx48';
        const redirect = 'http://localhost:3000';
        const url = `https://www.arcgis.com/sharing/rest/oauth2/authorize?client_id=${clientID}&response_type=token&expiration=20160&redirect_uri=${redirect}`;

        if (Object.keys(hash).length === 0 && hash.constructor === Object) {
            window.location.href = url;
            //this.SignIn();
        } else
            this.setState({auth: true})

        //

        /*  loadModules([
            'esri/identity/OAuthInfo',
            'esri/identity/IdentityManager'
        ])
            .then(([OAuthInfo, esriId]) => {
                var info = new OAuthInfo({
                    // Swap this ID out with a registered application ID
                    appId: 'QxDhwSEP9KoeKx48', //"zGdHIKswBSKahg18", 7dRnhUjZOAr983va
                    // Uncomment the next line and update if using your own portal
                    //portalUrl: 'https://services.arcgis.com/1WXsSdZFzziTTcic/ArcGIS',
                    // Uncomment the next line to prevent the user's signed in state from being shared with other apps on the same domain with the same authNamespace value.
                    // authNamespace: "portal_oauth_inline",
                    popup: false
                });

                esriId.registerOAuthInfos([info]);
                //esriId.getCredential(info.portalUrl + "/sharing");
            })
            .catch(err => {
                console.error(err);
            }); */

        //import { oauthHref } from "../utils";

        /* 
  return (
    <BtnWrap>
      <Button primary size="large" href={oauthHref}>
        Sign in with AGOL
      </Button>
    </BtnWrap>
  ); */
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
