import React from 'react';

const styles = {
    image: {
        width: 240,
        height: 120
    }
};

const SimpelImageComponent = () => {
    return (
        <img
            src="https://media.makeameme.org/created/component-component-everywhere.jpg"
            alt="Smiley face"
            style={styles.image}
        />
    );
};

export default SimpelImageComponent;
