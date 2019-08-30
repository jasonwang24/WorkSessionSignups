import React,{ Component } from 'react';
import './login.css';
import LoginCont from'../context/login-cont';

class Login extends Component {

    state={
        logging:true
    };

    swap=()=>{
        this.setState(prevState=>{
            return{logging:!prevState.logging};
        });
    };

    constructor(props){
        super(props);
        this.email=React.createRef();
        this.password=React.createRef();
    };

    static contextType=LoginCont;

    //regex to validate characters in address
    validateEmail(address) {
           var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
           return re.test(address);
    };

    readFields=(event)=>{
        event.preventDefault();
        const address=this.email.current.value;
        const pass=this.password.current.value;
        
        if(!this.validateEmail(address)||address.trim().length===0 || pass.trim().length===0){
            return;
        }

        let request={
            query: `
                query {
                    login(email:"${address}",password:"${pass}") {
                        checkUser
                        token
                        tokenExpire
                    }   
                }
            `
        };

        if(!this.state.logging){
            request = {
                query: `
                  mutation {
                    createUser(userInput: {email: "${address}", password: "${pass}"}) {
                      _id
                      email
                    }
                  }
                `
              };
        }

        
        fetch('http://localhost:8000/graphql',{
            method:'POST',
            body:JSON.stringify(request),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>{
            if(res.status!==200&&res.status!==201){
                throw new Error('Error');
            }
            return res.json();
        })
        .then(resData=>{
            if(resData.data.login.token){
                this.context.login(resData.data.login.token,resData.data.login.checkUser,resData.data.login.tokenExpire);
            }
        })
        .catch(err=>{
            console.log(err);
        });
    };

    render() {
        return (<form onSubmit={this.readFields}>
            <h1 className="title">Login Page</h1>
            <div className="infinity-loader">
              <div className="bg">
                <div className="left-bg"></div>
                <div className="right-bg"></div>
              </div>
              <div className="fg">
                <div className="top-left-rect">
                  <div></div>
                </div>
                <div className="bottom-right-rect">
                  <div></div>
                </div>
                <div className="top-right-rect">
                  <div></div>
                </div>
                <div className="bottom-left-rect">
                  <div></div>
                </div>
              </div>
            </div>
            <div className="all-forms">
                <div className="form">
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" ref={this.email} />
                </div>

                <div className="form">
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" ref={this.password}/>
                </div>

                <div className="formMod">
                    <button type="submit">Submit</button>
                    <button type="button" onClick={this.swap}>{this.state.logging ? 'Join':'Login'}</button>
                </div>
            </div>
        </form>
    );
    }
}

export default Login;