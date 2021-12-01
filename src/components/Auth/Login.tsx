import React, {Component} from "react";
import { Form} from 'react-bootstrap';
import { Link} from 'react-router-dom';
import BubleTitle from '../../Assets/buble.png'




type Credentials ={
    email: string,
    password: string
}

type Props ={
    updateLocalStorage(newToken: string): void
    checkAdmin(admin:Boolean): void
}

export default class Login extends Component <Props,Credentials>{
    constructor(props: Props){
        super(props)
        this.state ={
            email: '',
            password: '',
        }
    }

    

    handleChange = (event: any) =>{
        switch(event.target.name){
            case "email":
                this.setState({email: event.target.value})
                break;
            case "password":
                this.setState({password: event.target.value})
                break;
        }
    }

    handleSubmit = (event: any) => {
        event.preventDefault();

        fetch(`http://localhost:4000/user/login`,{
            method: 'POST',
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password}),
            headers: new Headers({'Content-Type': 'application/json'})
        })
        .then((response) => response.json())
        .then((json) =>  {
            this.props.checkAdmin(json.user.Admin)
            this.props.updateLocalStorage(json.token)})
        .catch((error) => console.log("Login Error:", error))
    }


    render(){
        return(
        <div className="Login-container">

            <div className="buble-title-login">
                <img src={BubleTitle} alt="Test" />
                <h2>Mental Health Social Media</h2>
                <p>No politics.  No drama.  Just you.</p>
            
                <h1>LOGIN</h1>
                <Form onSubmit={this.handleSubmit} style={{margin:"30px"}}>

                <Form.Group className="login-box" >
                    <Form.Control className="PHbox" required type="email" placeholder="Enter email" name="email" onChange={this.handleChange} />
                </Form.Group>

                <Form.Group className="login-box" >
                    <Form.Control className="PHbox" required type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                </Form.Group>

                <button className="login-button" type="submit">Log In</button>
            </Form>

            <div className="login-switch">
                <hr/>
                <Link to="/signup">
                <button className="login-button">Sign Up</button>
                </Link>
            </div>
            </div>
        </div>
        )
    }
}