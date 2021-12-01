import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect  } from 'react-router-dom';
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'
import HomePage from './components/HomePage/HomePage'
import AccountSettingsDisplay from './components/AccountSettings/AccountSettingsDisplay'
import AdminPage from './components/Admin/AdminDisplay'
import Navbar from './components/Navbar'
  
  type Token ={
    sessionToken: string
    Admin: Boolean
}

class App extends Component <{},Token>{
    constructor(props: any){
        super(props)
        this.state={
            sessionToken: (localStorage.getItem('token')!),
            Admin: false
        }
    }

     updateLocalStorage = (newToken:string) => {
        localStorage.setItem('token', newToken);
        this.setState({sessionToken: newToken})
      };

      logout = () => {
        this.setState({sessionToken: ''})
        this.setState({Admin: false})
      }

      checkAdmin = (admin:Boolean) => {
        if(admin === true){
          this.setState({Admin: true})
        }
      }
      


render(){
  
  if(this.state.sessionToken !== ''){
    if(this.state.Admin === true){
      return(
        <Router>
           <Navbar logout={this.logout}/>
          <Redirect from='/login' to='/adminpage'/>
          <Switch>
            <Route path='/adminpage'><AdminPage /></Route>
          </Switch>
        </Router>
      )
    } else {
        return(
        <Router>
          <Navbar logout={this.logout}/>
          <Redirect from="/login" to="/homepage"/>
          <Switch>
            <Route path="/homepage"><HomePage sessionToken={this.state.sessionToken} /></Route>
            <Route path="/signup"><Signup  updateLocalStorage={this.updateLocalStorage} /></Route>
            <Route path="/accountsettings"><AccountSettingsDisplay /></Route>
          </Switch>
        </Router>) 
      }
    } else {
  return(
    <Router>
      <Redirect from="/" to="/login"/>
        <Switch>
          <Route exact path="/login"><Login checkAdmin={this.checkAdmin} updateLocalStorage={this.updateLocalStorage} /></Route>
          <Route path="/signup"><Signup updateLocalStorage={this.updateLocalStorage} /></Route>
          <Route path="/homepage"><HomePage sessionToken={this.state.sessionToken} /></Route>
          <Route path="/accountsettings"><AccountSettingsDisplay /></Route>
        </Switch>      
    </Router>)
  };
}

}

export default App;
