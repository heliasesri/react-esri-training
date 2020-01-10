import { loadModules } from 'esri-loader';

const AddFeatureLayer = (map, id) => {
    if (map && id)
        loadModules(['esri/layers/FeatureLayer'])
            .then(([FeatureLayer]) => {
                for (let i = 0; i < id.length; i++) {
                    const featureLayer = new FeatureLayer({
                        portalItem: {
                            id: id[i]
                        }
                    });

                    console.log(featureLayer)

                    map.add(featureLayer);
                }
            })
            .catch(err => {
                console.error(err);
            });
};

export default AddFeatureLayer;
