import React,{Component} from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Sessions from './pages/sessions';
import Signups from './pages/signups';
import MainNav from'./components/NavBar/Main';
import SideBar from './components/SideBar/SideBar';
import Fade from './components/SideBar/Fade';
import LoginCont from './context/login-cont';

class App extends Component{

    state={
        sideOpen:false,
        token:null,
        checkUser:null
    };

    clickHandle=()=>{
        this.setState((prevState)=>{
            return{sideOpen:!prevState.sideOpen};
        });
    };

    closeClick=()=>{
        this.setState({sideOpen:false});
    };

    login=(token,checkUser,tokenExpire)=>{
        this.setState({token:token,checkUser:checkUser});
        console.log(token);
        console.log(checkUser);
    };

    logout=()=>{
        this.setState({token:null,checkUser:null});
    };


    render() {
      let sidebar;
      if(this.state.sideOpen){
        sidebar=<SideBar nextClick={this.closeClick}/>
      }
      let fade;
      if(this.state.sideOpen){
        fade=<Fade click={this.closeClick}/>
      }
      return (
        <BrowserRouter>
        <React.Fragment>
        <LoginCont.Provider value={{token:this.state.token,checkUser:this.state.checkUser,login:this.login,logout:this.logout}}>    
        <div style={{height:'100%'}}>  
                <MainNav clickHandler={this.clickHandle}/>
                {sidebar}
                {fade}
                    <main className="content">
                        <Switch>
                         {this.state.token&&<Redirect from ="/" to="/sessions" exact/>}
                         {this.state.token&&<Redirect from ="/login" to="/sessions" exact/>}
                         {!this.state.token&&<Redirect from ="/sessions" to="login" exact/>}
                         {!this.state.token&&(<Route path="/login" component={Login} />)}
                         <Route path="/sessions" component={Sessions} />
                         {this.state.token&&(<Route path="/signups" component={Signups} />)}
                         {!this.state.token&&<Redirect to="/login" exact/>}
                        </Switch>
                    </main>
        </div>
        </LoginCont.Provider>
        </React.Fragment>
        </BrowserRouter>
      );
    }
}

export default App;
