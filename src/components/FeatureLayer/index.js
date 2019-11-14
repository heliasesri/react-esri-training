import { loadModules } from 'esri-loader';

const AddFeatureLayer = (map, id) => {
    loadModules(['esri/layers/FeatureLayer'])
        .then(([FeatureLayer]) => {
            var featureLayer = new FeatureLayer({
                portalItem: {
                    id: id
                }
            });

            map.add(featureLayer);
        })
        .catch(err => {
            console.error(err);
        });
};

export default AddFeatureLayer;
