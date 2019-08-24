import React from 'react';
import {NavLink} from'react-router-dom';
import './NavStyle.css';
import SideButton from '../SideBar/SideButton';

const MainNav = props => (
    <header className="main-nav">
        <div>
            <SideButton click={props.clickHandler}/>
        </div>
        <div className="nav-title">
            <h1>Waterloop Work Sessions</h1>
        </div>
        <nav className="nav-item">
            <ul>
                <li><NavLink to="/sessions">Sessions</NavLink></li>
                <li><NavLink to="/signups">Signups</NavLink></li>
                <li className="login-format"><NavLink to="/login">Login</NavLink></li>
            </ul>
        </nav>
    </header>
);

export default MainNav;