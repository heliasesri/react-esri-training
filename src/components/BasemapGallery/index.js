import { loadModules } from 'esri-loader';

const CreateBaseMapGallery = view => {
    return loadModules(['esri/widgets/BasemapGallery'])
        .then(([BasemapGallery]) => {
            const basemapGallery = new BasemapGallery({
                view: view
            });

            return basemapGallery;
        })
        .catch(err => {
            console.error(err);
        });
};

export default CreateBaseMapGallery;
