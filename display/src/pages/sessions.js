import React,{ Component } from 'react';
import './sessions.css';
import Window from '../components/Windows/Window';
import Fade from'../components/Windows/Fade';
import LoginCont from '../context/login-cont';
import ListSessions from '../components/SessionDisplay/Sessions/ListSessions';

class Sessions extends Component {
    state={
        new:false,
        sessions:[],
        load:false
    };

    startNew=()=>{
        this.setState({new:true});
    };

    checkCancel=()=>{
        this.setState({new:false});
    };

    static contextType = LoginCont;

    constructor(props){
        super(props);
        this.titleRef=React.createRef();
        this.dateRef=React.createRef();
        this.urgencyRef=React.createRef();
        this.descriptionRef=React.createRef();
    }

    componentDidMount(){
        this.getData();
    }

    checkConfirm=()=>{
        this.setState({new:false});
        const title=this.titleRef.current.value;
        const date=this.dateRef.current.value;
        const urgency=+this.urgencyRef.current.value;
        const description=this.descriptionRef.current.value;
        if(title.trim().length===0||urgency<1||urgency>5||date.trim().length===0||description.trim().length===0){
            return;
        }
        const session={title,urgency,date,description};
        console.log(session);

        const request = {
        query: `
          mutation {
            createSession(sessionInput: {title: "${title}", description: "${description}", urgency: ${urgency}, date: "${date}"}) {
                _id
                title
                description
                urgency
                date
            }
          }
        `
    };
        const token=this.context.token;
        
        fetch('http://localhost:8000/graphql',{
            method:'POST',
            body:JSON.stringify(request),
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token
            }
        })
        .then(res=>{
            if(res.status!==200&&res.status!==201){
                throw new Error('Error!!!');
            }
            return res.json();
        })
        .then(resData=>{
           this.setState(prevState=>{
                const newSessions=[...prevState.sessions];
                newSessions.push({
                    _id: resData.data.createSession._id,
                    title: resData.data.createSession.title,
                    description:resData.data.createSession.description,
                    date:resData.data.createSession.date,
                    urgency:resData.data.createSession.urgency,   
                    creator:{
                        _id: this.context.checkUser
                    } 
                }); 
                return{sessions:newSessions}
            });
        })
        .catch(err=>{
            console.log(err);
        });
    };

    getData(){
        this.setState({load:true});
        const request = {
        query: `
          query { 
            sessions{   
                _id
                title
                description
                date
                urgency  
                creator{
                    _id
                    email
                }    
            }
          }
        `
       };
        
        fetch('http://localhost:8000/graphql',{
            method:'POST',
            body:JSON.stringify(request),
            headers:{
                'Content-Type':'application/json',  
            }
        })
        .then(res=>{
            if(res.status!== 200 && res.status !== 201){
                throw new Error('Error!!!');
            }
            return res.json();
        })
        .then(resData=>{
           console.log(resData);
           const sessions=resData.data.sessions;
           this.setState({sessions:sessions, load:false});
        })
        .catch(err=>{
            console.log(err);
            this.setState({load:false});
        });
    }

    render() {
        return (
            <React.Fragment>
            {this.state.new && <Fade/>}
            {this.state.new && <Window title="Adding a Session..." cancel confirm cancelling={this.checkCancel} confirming={this.checkConfirm}>
                <form>
                   <div className="form">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" ref={this.titleRef}></input>
                   </div> 
                   <div className="form">
                        <label htmlFor="date">Date</label>
                        <input type="datetime-local" id="date" ref={this.dateRef}></input>
                   </div> 
                   <div className="form">
                        <label htmlFor="urgency">Urgency Rating (1-5)</label>
                        <input type="number" max="5" min="1" id="urgency" ref={this.urgencyRef}></input>
                   </div> 
                   <div className="form">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" rows="4" ref={this.descriptionRef}></textarea>
                   </div>
                </form>
            </Window>}
            {this.context.token && <div className="sessionMod">
                <p>Add a Waterloop Work Session!</p>
                <button className="buttonformat" onClick={this.startNew}>Create Session</button>
            </div>}
            {this.state.load ? (
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
            ) : (
            <ListSessions 
                sessions={this.state.sessions} 
                authUserId={this.context.checkUser} 
            />)}
            </React.Fragment>
        );
    }
}

export default Sessions;