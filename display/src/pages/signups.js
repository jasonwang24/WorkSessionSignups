import React,{ Component } from 'react';
import LoginCont from '../context/login-cont';
import ListSignup from '../components/SignupDisplay/Signups/ListSignups';

class Signups extends Component {
    state={
        load:false,
        signups:[],
        empty:false
    };

    static contextType=LoginCont;
    
    componentDidMount(){
        this.getData();
    }

    getData=()=>{
        this.setState({load:true});
        const request = {
        query: `
          query { 
            signups{   
                _id
                createdAt
                session{
                    _id
                    title
                    date
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
                'Authorization': 'Bearer '+ this.context.token
            }
        })
        .then(res=>{
            if(res.status!== 200 && res.status !== 201){
                throw new Error('Error!!!');
            }
            return res.json();
        })
        .then(resData=>{
           const signups=resData.data.signups;
           this.setState({signups:signups,load:false});
        })
        .catch(err=>{
            console.log(err);
            this.setState({load:false});
        });
    };

    cancellingSession=signupId=>{
        this.setState({load:true});
        const request = {
        query: `
          mutation { 
            cancelSignup(signupId:"${signupId}"){   
                _id
                title
            }
          }
        `
       };
        
        fetch('http://localhost:8000/graphql',{
            method:'POST',
            body:JSON.stringify(request),
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Bearer '+ this.context.token
            }
        })
        .then(res=>{
            if(res.status!== 200 && res.status !== 201){
                throw new Error('Error!!!');
            }
            return res.json();
        })
        .then(resData=>{
           this.setState(prevState=>{
               const newSignups = prevState.signups.filter(signup=>{
                    return signup._id !== signupId;
               });
               return {signups:newSignups,load:false};
           });
        })
        .catch(err=>{
            console.log(err);
            this.setState({load:false});
        });
    }

    render() {
        return (
            <React.Fragment>
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
                    <ListSignup signups={this.state.signups} whenCancel={this.cancellingSession} testing={this.state.signups.length}/>
                )}

                
            </React.Fragment>
        );
    }
}

export default Signups;