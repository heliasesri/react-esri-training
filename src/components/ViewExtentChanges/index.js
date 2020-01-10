import { loadModules } from 'esri-loader';

const OnViewChanges = (view, viewProperties) => {
    view &&
        loadModules(['esri/core/watchUtils'])
            .then(([watchUtils]) => {
                watchUtils.whenTrue(view, 'stationary', function() {
                    viewProperties.center = view.center;
                    viewProperties.zoom = view.zoom;
                    console.log('Viewpoint Updated');
                });
            })
            .catch(err => {
                console.error(err);
            });
};

export default OnViewChanges;
