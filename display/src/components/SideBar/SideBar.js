import React from 'react';
import './SideBar.css';
import {NavLink} from'react-router-dom';

const sidebar = props=>{
    let bar='sidebar';
    if(props.display){
        bar = 'sidebar open';
    }
    return (<nav className={bar} >
            <ul>
                <li><NavLink to="/login" onClick={props.nextClick}>Login</NavLink></li>
                <li><NavLink to="/sessions" onClick={props.nextClick}>Sessions</NavLink></li>
                <li><NavLink to="/signups" onClick={props.nextClick}>Signups</NavLink></li>    
            </ul>  
            <div className="backdrop" onClick={props.click}></div>
        </nav>
        );      
};

export default sidebar;