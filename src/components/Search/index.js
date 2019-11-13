import { loadModules } from 'esri-loader';

const CreateSearch = view => {
    loadModules(['esri/widgets/Search'])
        .then(([Search]) => {
            const searchWidget = new Search({
                view: view
            });

            view.ui.add(searchWidget, {
                position: 'top-right',
                index: 0
            });
        })
        .catch(err => {
            console.error(err);
        });
};

export default CreateSearch;
