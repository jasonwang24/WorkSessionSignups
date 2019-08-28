import React,{ Component } from 'react';
import './sessions.css';
import Window from '../components/Windows/Window';
import Fade from'../components/Windows/Fade';

class Sessions extends Component {
    state={
        new:false
    };

    startNew=()=>{
        this.setState({new:true});
    }

    checkCancel=()=>{
        this.setState({new:false});
    }

    checkConfirm=()=>{
        this.setState({new:false});
    }

    render() {
        return (
            <React.Fragment>
            {this.state.new && <Fade/>}
            {this.state.new && <Window title="Adding a Session..." cancel confirm cancelling={this.checkCancel} confirming={this.checkConfirm}>
                <p>text</p>
            </Window>}
            <div className="sessionMod">
                <p>Add a Waterloop Work Session</p>
                <button className="buttonformat" onClick={this.startNew}>Create Session</button>
            </div>
            </React.Fragment>
        );
    }
}

export default Sessions;