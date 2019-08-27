import React,{ Component } from 'react';
import './login.css';

class Login extends Component {
    render() {
        return (<form className="all-forms">
            
            <div className="form">
                <label htmlFor="email">Email: </label>
                <input type="email" id="email" />
            </div>

            <div className="form">
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" />
            </div>

            <div className="formMod">
                <button type="submit">Submit</button>
                <button type="button">Signup</button>
            </div>
        </form>
    );
    }
}

export default Login;