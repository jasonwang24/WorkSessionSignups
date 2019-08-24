import React from 'react';

import './SideButton.css';

const SideButton = props =>(
    <button className="button" onClick={props.click}>
        <div className="button-line"/>
        <div className="button-line"/>
        <div className="button-line"/>
    </button>

    
);

export default SideButton;