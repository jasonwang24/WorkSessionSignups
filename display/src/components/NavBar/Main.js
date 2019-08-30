import React from 'react';
import {NavLink} from'react-router-dom';
import './NavStyle.css';
import SideButton from '../SideBar/SideButton';
import LoginCont from'../../context/login-cont';

const MainNav = props => (
    <LoginCont.Consumer>
        {context=>{
            return(
                <header className="main-nav">
                    <div>
                        <SideButton click={props.clickHandler}/>
                    </div>
                    <div className="nav-title">
                        <h1>Waterloop Work Sessions</h1>
                    </div>
                    <nav className="nav-item">
                        <ul>
                            {context.token &&(<li><NavLink to="/sessions">Sessions</NavLink></li>)}
                            {context.token &&(<li><NavLink to="/signups">Signups</NavLink></li>)}
                            {!context.token && (<li className="login-format"><NavLink to="/login">Login</NavLink></li>)}
                            {context.token&&(<li className="login-format"><button onClick={context.logout}>Logout</button></li>)}
                        </ul>
                    </nav>
                </header>
            );
        }}
    </LoginCont.Consumer>
);

export default MainNav;