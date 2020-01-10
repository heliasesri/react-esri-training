import { loadModules } from 'esri-loader';

const AddExpand = (view, component, icon = 'esri-icon-applications') => {
    component &&
        view &&
        loadModules(['esri/widgets/Expand'])
            .then(([Expand]) => {
                const expandWidget = new Expand({
                    view: view,
                    content: component,
                    expandIconClass: icon //https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/index.html
                });

                /*  const expandTest = new Expand({
                    view: view,
                    content: expandWidget
                }) */

                view.ui.add(expandWidget, {
                    position: 'top-right'
                });
            })
            .catch(err => {
                console.error(err);
            });
};

export default AddExpand;
