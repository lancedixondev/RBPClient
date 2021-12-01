import React, {Component} from "react";
import Icon from '../Assets/icon.png'
import { BrowserRouter as Router, Route, Switch, Redirect, Link  } from 'react-router-dom';

type Props ={
    logout: any
}
export default class Navbar extends Component<Props,{}>{
    constructor(props: Props){
        super(props)
        this.state ={
        }
    }

    clearLocalStorage = () =>{
        this.props.logout()
        localStorage.clear();
        this.setState({sessionToken: null})
      };


    render(){
        return(
        <div className="navBar">
            <Link to="/homepage"><img src={Icon} alt="logo"/></Link>
            <button onClick={this.clearLocalStorage}>Logout</button>
            <Link to="/accountsettings"><button>Account</button></Link>
        </div>
        )
        
    }
}
