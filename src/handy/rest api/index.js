import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';

export const generateToken = (
    username,
    password,
    referer = 'localhost:3000',
    expiration = '60'
) => {
    const url = 'https://www.arcgis.com/sharing/rest/generateToken';
    const bodyFormData = new FormData();
    bodyFormData.set('username', username);
    bodyFormData.set('password', password);
    bodyFormData.set('referer', referer);
    bodyFormData.set('expiration', expiration);

    return axios
        .post(url, bodyFormData, {
            params: {
                request: 'getToken',
                f: 'json'
            }
        })
        .then(response => {
            if (response.data.token) return response.data.token;
            else {
                console.log(response.data.error);
                return false;
            }
        })
        .catch(error => {
            console.log(error);
            return false;
        });
};

export const createService = (
    token,
    name = 'WebMapTrainingReactService',
    username = 'Helias.Breneol',
    folder = '49419c8527cf4fcbb39b5234fcdb880e',
    serviceDefinition = null
) => {
    if (!serviceDefinition)
        serviceDefinition = {
            name: name,
            serviceDescription: '',
            hasStaticData: false,
            maxRecordCount: 5000,
            supportedQueryFormats: 'JSON',
            capabilities: 'Create,Delete,Query,Update,Editing',
            description: '',
            copyrightText: '',
            spatialReference: {
                wkid: 102100
            },
            initialExtent: {
                xmin: -20037507.0671618,
                ymin: -30240971.9583862,
                xmax: 20037507.0671618,
                ymax: 18398924.324645,
                spatialReference: {
                    wkid: 102100,
                    latestWkid: 3857
                }
            },
            allowGeometryUpdates: true,
            units: 'esriMeters',
            xssPreventionInfo: {
                xssPreventionEnabled: true,
                xssPreventionRule: 'input',
                xssInputRule: 'rejectInvalid'
            }
        };

    const url = `https://www.arcgis.com/sharing/rest/content/users/${username}/${folder}/createService`;
    const bodyFormData = new FormData();
    bodyFormData.set('createParameters', JSON.stringify(serviceDefinition));

    return axios
        .post(url, bodyFormData, {
            params: {
                token: token,
                f: 'json'
            }
        })
        .then(async response => {
            if (response.data.serviceurl) return response.data.serviceurl;
            else {
                console.log(response.data.error);
                return await getService(token, username, folder, name);
            }
        })
        .catch(error => {
            console.log(error);
            return false;
        });
};

export const getService = (token, username, folder, name) => {
    const url = `https://www.arcgis.com/sharing/rest/content/users/${username}/${folder}`;
    return axios
        .get(url, {
            params: {
                token: token,
                f: 'json'
            }
        })
        .then(response => {
            let url = false;
            response.data.items.forEach(item => {
                if (item.owner === username && item.name === name)
                    return (url = item.url);
            });
            return url;
        })
        .catch(error => {
            console.log(error);
            return false;
        });
};

export const addDefinition = async (token, serviceURL, layer) => {
    let definition = {
        layers: [
            {
                adminLayerInfo: {
                    geometryField: { name: 'Shape' },
                    xssTrustedFields: ''
                },
                //id: 0,
                name: layer.id,
                type: 'Feature Layer',
                displayField: '',
                description: '',
                copyrightText: '',
                defaultVisibility: true,
                relationships: [],
                isDataVersioned: false,
                supportsAppend: true,
                supportsCalculate: true,
                supportsASyncCalculate: true,
                supportsTruncate: false,
                supportsAttachmentsByUploadId: true,
                supportsAttachmentsResizing: true,
                supportsRollbackOnFailureParameter: true,
                supportsStatistics: true,
                supportsExceedsLimitStatistics: true,
                supportsAdvancedQueries: true,
                supportsValidateSql: true,
                supportsCoordinatesQuantization: true,
                supportsFieldDescriptionProperty: true,
                supportsQuantizationEditMode: true,
                supportsApplyEditsWithGlobalIds: true,
                supportsMultiScaleGeometry: true,
                supportsReturningQueryGeometry: true,
                hasGeometryProperties: true,
                geometryProperties: {
                    shapeAreaFieldName: 'Shape__Area',
                    shapeLengthFieldName: 'Shape__Length'
                },
                advancedQueryCapabilities: {
                    supportsPagination: true,
                    supportsPaginationOnAggregatedQueries: true,
                    supportsQueryRelatedPagination: true,
                    supportsQueryWithDistance: true,
                    supportsReturningQueryExtent: true,
                    supportsStatistics: true,
                    supportsOrderBy: true,
                    supportsDistinct: true,
                    supportsQueryWithResultType: true,
                    supportsSqlExpression: true,
                    supportsAdvancedQueryRelated: true,
                    supportsCountDistinct: true,
                    supportsPercentileStatistics: true,
                    supportsQueryAttachments: true,
                    supportsReturningGeometryCentroid: true,
                    supportsReturningGeometryProperties: true,
                    supportsQueryWithDatumTransformation: true,
                    supportsHavingClause: true,
                    supportsOutFieldSQLExpression: true,
                    supportsMaxRecordCountFactor: true,
                    supportsTopFeaturesQuery: true,
                    supportsDisjointSpatialRel: true,
                    supportsQueryWithCacheHint: true,
                    supportsQueryAttachmentsWithReturnUrl: true
                },
                useStandardizedQueries: true,
                geometryType: 'esriGeometryPolygon',
                minScale: 0,
                maxScale: 0,
                extent: {
                    xmin: layer.fullExtent.xmin,
                    ymin: layer.fullExtent.ymin,
                    xmax: layer.fullExtent.xmax,
                    ymax: layer.fullExtent.ymax,
                    spatialReference: {
                        wkid: layer.spatialReference.wkid,
                        latestWkid: layer.spatialReference.latestWkid
                    }
                },
                drawingInfo: {
                    renderer: layer.renderer,
                    transparency: 0,
                    labelingInfo: null
                },
                allowGeometryUpdates: true,
                hasAttachments: true,

                attachmentProperties: [
                    {
                        name: 'name',
                        isEnabled: true
                    },
                    {
                        name: 'size',
                        isEnabled: true
                    },
                    {
                        name: 'contentType',
                        isEnabled: true
                    },
                    {
                        name: 'keywords',
                        isEnabled: true
                    },
                    {
                        name: 'exifInfo',
                        isEnabled: true
                    }
                ],
                htmlPopupType: 'esriServerHTMLPopupTypenull',
                hasM: false,
                hasZ: false,
                objectIdField: 'OBJECTID',
                globalIdField: 'GlobalID',
                typeIdField: '',
                fields: [
                    {
                        name: 'OBJECTID',
                        type: 'esriFieldTypeOID',
                        alias: 'OBJECTID',
                        sqlType: 'sqlTypeOther',
                        nullable: false,
                        editable: false,
                        visible: true,
                        domain: null,
                        defaultValue: null
                    },
                    {
                        name: 'GlobalID',
                        type: 'esriFieldTypeGlobalID',
                        alias: '',
                        sqlType: 'sqlTypeOther',
                        length: 38,
                        nullable: false,
                        editable: false,
                        visible: true,
                        domain: null,
                        defaultValue: null
                    },
                    {
                        name: 'Shape__Area',
                        type: 'esriFieldTypeDouble',
                        alias: 'Shape__Area',
                        sqlType: 'sqlTypeDouble',
                        nullable: true,
                        editable: false,
                        visible: true,
                        domain: null,
                        defaultValue: null
                    },
                    {
                        name: 'Shape__Length',
                        type: 'esriFieldTypeDouble',
                        alias: 'Shape__Length',
                        sqlType: 'sqlTypeDouble',
                        nullable: true,
                        editable: false,
                        visible: true,
                        domain: null,
                        defaultValue: null
                    }
                ],
                types: [],
                supportedQueryFormats: 'JSON, geoJSON',
                hasStaticData: false,
                maxRecordCount: 5000,
                standardMaxRecordCount: 4000,
                tileMaxRecordCount: 4000,
                maxRecordCountFactor: 1,
                capabilities: 'Create, Delete, Query, Update, Editing, Sync',
                exceedsLimitFactor: 1
            }
        ]
    };

    const definitionField = cloneDeep(definition['layers'][0]['fields']);

    layer.fields.forEach(field => {
        if (!containsField(field, definitionField))
            definition['layers'][0]['fields'].push({
                name: field.name,
                type: 'esriFieldTypeString',
                alias: field.name,
                sqlType: 'sqlTypeOther',
                length: 256,
                nullable: true,
                editable: true,
                visible: true,
                domain: null,
                defaultValue: null
            });
    });

    const adminURL = serviceURL.replace(
        '/rest/services/',
        '/rest/admin/services/'
    );
    const url = `${adminURL}/addToDefinition`;
    const bodyFormData = new FormData();
    bodyFormData.set('addToDefinition', JSON.stringify(definition));

    return await axios
        .post(url, bodyFormData, {
            params: {
                token: token,
                f: 'json'
            }
        })
        .then(async response => {
            if (
                response.data.layers[0].id === 0 ||
                response.data.layers[0].id
            ) {
                return `${serviceURL}/${response.data.layers[0].id}`;
            } else {
                return false;
            }
        })
        .catch(error => {
            console.log(error);
            return false;
        });
};

const containsField = (field, definition) => {
    for (let i = 0; i < definition.length; i++) {
        if (definition[i]['name'] === field.name) return true;
    }
    return false;
};

export const addFeatures = (serviceLayer, token, layer) => {
    let featuresList = [];
    for (const item of layer.source.items) {
        featuresList.push(item.toJSON());
    }

    const url = `${serviceLayer}/addFeatures`;
    const bodyFormData = new FormData();
    bodyFormData.set('features', JSON.stringify(featuresList));

    return axios
        .post(url, bodyFormData, {
            params: {
                token: token,
                f: 'json'
            }
        })
        .then(response => {
            if (response.data.error) return false;

            return true;
        })
        .catch(error => {
            console.log(error);
            return false;
        });
};
