import ReactDOM from 'react-dom';

export const ReactElementToDomElement = (reactElement, domElement = 'div') => {
    const container = document.createElement(domElement);
    ReactDOM.render(reactElement, container);
    return container;
};

