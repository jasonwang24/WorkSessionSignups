import React from 'react';
import './SideBar.css';
import {NavLink} from'react-router-dom';

const sidebar = props=>{

    return (<nav className="sidebar open" onClick={props.nextClick}>
            <ul>
                <li><NavLink to="/login" >Login</NavLink></li>
                <li><NavLink to="/sessions" >Sessions</NavLink></li>
                <li><NavLink to="/signups" >Signups</NavLink></li>    
            </ul>  
        </nav>
        );      
};

export default sidebar;