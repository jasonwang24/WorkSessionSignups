import React,{ Component } from 'react';

class Login extends Component {
    render() {
        return <form>
            <div className="form">
                <label htmlFor="email">Email: </label>
                <input type="email" id="email" />
            </div>

            <div className="form">
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" />
            </div>

            <div className="formMod">
                <button type="button">Signup</button>
                <button type="submit">Submit</button>
            </div>
        </form>;
    }
}

export default Login;