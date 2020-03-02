import { loadModules } from 'esri-loader';

const CreateTrack = view => {
    loadModules(["esri/widgets/Track"])
        .then(([Track]) => {
            const trackWidget = new Track({
                view: view
            });

            view.ui.add(trackWidget, {
                position: 'top-left'
            });
        })
        .catch(err => {
            console.error(err);
        });
};

export default CreateTrack;
