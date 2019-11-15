import React, { Component } from 'react';
import { loadModules } from 'esri-loader';

const styles = {
    sidebarDiv: {
        left: '0',
        top: '0',
        bottom: '0',
        width: '300px'
    },
    overlayDiv: {
        zIndex: 1,
        position: 'absolute',
        margin: 'auto auto',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: '400px',
        height: '160px',
        padding: '10px',
        backgroundColor: 'white',
        border: '1px solid grey',
        visibility: 'hidden'
    },

    viewDiv: {
        position: 'absolute',
        right: 0,
        left: '300px',
        top: 0,
        bottom: 0
    },

    head: {
        margin: '0 auto',
        width: '100%',
        padding: '20px'
    },
    info: {
        margin: '0 auto',
        width: '100%',
        padding: '20px',
        fontSize: '75%',
        fontWeight: '200'
    }
};

class SaveMap extends Component {
    componentDidMount() {
        loadModules([
            'esri/identity/OAuthInfo',
            'esri/identity/IdentityManager'
        ])
            .then(([OAuthInfo, esriId]) => {
                const { map, view } = this.props;

                var info = new OAuthInfo({
                    // Swap this ID out with a registered application ID
                    appId: 'q244Lb8gDRgWQ8hM',
                    // Uncomment the next line and update if using your own portal
                    // portalUrl: "https://<host>:<port>/arcgis"
                    // Uncomment the next line to prevent the user's signed in state from being shared with other apps on the same domain with the same authNamespace value.
                    // authNamespace: "portal_oauth_inline",
                    popup: true
                });

                esriId.registerOAuthInfos([info]);

                // when the scene and view resolve, display the scene's
                // new title in the Div
               /*  var sidebar = document.getElementById("sidebarDive");
                console.log(sidebar)
                var title = sidebar.getElementsByTagName('input')[0];
                var save = sidebar.getElementsByTagName('input')[1];
                console.log(save);
                title.value = 'WebScene Saving Sample';
                save.disabled = false;

                var overlay = document.getElementById('overlayDiv');
                var ok = overlay.getElementsByTagName('input')[0];

                function statusMessage(head, info) {
                    overlay.getElementsByClassName('head')[0].innerHTML = head;
                    overlay.getElementsByClassName('info')[0].innerHTML = info;
                    overlay.style.visibility = 'visible';
                }

                ok.addEventListener('click', function() {
                    overlay.style.visibility = 'hidden';
                });

                save.addEventListener('click', function() {
                    // item automatically casts to a PortalItem instance by saveAs
                    var item = {
                        title: title.value
                    };

                    // Update properties of the WebScene related to the view. This should be called just before saving a scene.
                     map.updateFrom(view);

                    map.saveAs(item)
                        // Saved successfully
                        .then(function(item) {
                            // link to the newly-created web scene item
                            var itemPageUrl =
                                item.portal.url +
                                '/home/item.html?id=' +
                                item.id;
                            var link =
                                '<a target="_blank" href="' +
                                itemPageUrl +
                                '">' +
                                title.value +
                                '</a>';

                            statusMessage(
                                'Save Webscene',
                                '<br> Successfully saved as <i>' + link + '</i>'
                            );
                        })
                        // Save didn't work correctly
                        .catch(function(error) {
                            statusMessage(
                                'Save Webscene',
                                '<br> Error ' + error
                            );
                        }); 
                });*/
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        return (
            <React.Fragment>
                <div
                    style={styles.sidebarDiv}
                    id="sidebarDive"
                    className="esri-widget"
                >
                    <div>
                        <h3>Save Webscene</h3>
                        <div>Title:</div>
                        <input type="text" />{' '}
                        <input type="button" value="Save" disabled />
                    </div>
                </div>
                <div style={styles.overlayDiv} id="overlayDiv">
                    <label style={styles.head} className="head"></label>
                    <label style={styles.info} className="info"></label>
                    <input type="button" value="Ok" />
                </div>
                <div style={styles.viewDiv} id="viewDiv"></div>
            </React.Fragment>
        );
    }
}

export default SaveMap;
