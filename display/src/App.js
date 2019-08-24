import React,{Component} from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Sessions from './pages/sessions';
import Signups from './pages/signups';
import MainNav from'./components/NavBar/Main';
import SideBar from './components/SideBar/SideBar';
import Fade from './components/SideBar/Fade';

class App extends Component{

    state={
        sideOpen:false
    };

    clickHandle=()=>{
        this.setState((prevState)=>{
            return{sideOpen:!prevState.sideOpen};
        });
    };

    backClick=()=>{
        this.setState({sideOpen:false});
    };

    render() {
      let fade;
      if(this.state.sideOpen){
        fade=<Fade click={this.backClick}/>;
      }
      return (
        <BrowserRouter>
        <div style={{height:'100%'}}>
            <MainNav clickHandler={this.clickHandle}/>
            <SideBar display={this.state.sideOpen} />
            {fade}
            
            <React.Fragment>
                <main className="content">
                    <Switch>
                     <Redirect from ="/" to="/login" exact/>
                     <Route path="/login" component={Login} />
                     <Route path="/sessions" component={Sessions} />
                     <Route path="/signups" component={Signups} />
                    </Switch>
                </main>
            </React.Fragment>
        </div>
        </BrowserRouter>
      );
    }
}

export default App;
