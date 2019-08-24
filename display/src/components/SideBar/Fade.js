import React from 'react';
import './Fade.css';

const fade=props=>{

    return(
        <div className="backdrop" onClick={props.click}/>
    );
};

export default fade;