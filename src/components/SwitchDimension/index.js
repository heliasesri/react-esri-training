import React, { Component } from 'react';

const styles = {
    switchButton: {
        border: 'none'
        /* boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 2px' */
    }
};

class SwitchComponent extends Component {
    change = () => {
        if (!this.props.changeFunction)
            return console.log('This function is not configured');

        this.props.changeFunction();
    };

    render() {
        return (
            <React.Fragment>
                {this.props.dimension && (
                    <button
                        id="switch-btn"
                        style={styles.switchButton}
                        className=" esri-widget--button esri-widget esri-interactive"
                        onClick={() => {
                            this.change();
                        }}
                    >
                        {this.props.dimension}
                    </button>
                )}
            </React.Fragment>
        );
    }
}

export default SwitchComponent;
