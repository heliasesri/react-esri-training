import { loadModules } from 'esri-loader';

const CreateTrack = view => {
    loadModules(["esri/widgets/Track"])
        .then(([Track]) => {
            const trackhWidget = new Track({
                view: view
            });

            view.ui.add(trackhWidget, {
                position: 'top-left'
            });
        })
        .catch(err => {
            console.error(err);
        });
};

export default CreateTrack;
