import React, {Component} from "react";
import {Link} from 'react-router-dom';
import { Form} from 'react-bootstrap';
import BubleTitle from '../../Assets/buble.png'


type Credentials ={
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

type Props ={
    updateLocalStorage(newToken: string): void
}

export default class Signup extends Component <Props,Credentials>{
    constructor(props: Props){
        super(props)
        this.state ={
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        }
    }

    handleChange = (event: any) =>{
        switch(event.target.name){
            case "firstName": 
                this.setState({firstName: event.target.value})
                break;
            case "lastName":
                this.setState({lastName: event.target.value})
                break;
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

        fetch(`http://localhost:4000/user/register`,{
            method: 'POST',
            body: JSON.stringify({
                firstName: this.state.firstName, 
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password}),
            headers: new Headers({'Content-Type': 'application/json'})
        })
        .then((response) => response.json())
        .then((json) => {this.props.updateLocalStorage(json.token)})
        .catch((error) => console.log("Login Error:", error))
    }



    render(){
        return(
        <div className="Login-container">
            <div className="buble-title-login">
            <img src={BubleTitle} alt="Test" />
            <h1>Sign Up</h1>

                <Form onSubmit={this.handleSubmit} style={{margin:"30px"}}>

                <Form.Group className="login-box" >
                    <Form.Control required type="firstName" placeholder="First Name" name="firstName" onChange={this.handleChange} />
                </Form.Group>

                <Form.Group className="login-box" >
                    <Form.Control required type="lastName" placeholder="Last Name" name="lastName" onChange={this.handleChange} />
                </Form.Group>

                <Form.Group className="login-box" >
                    <Form.Control required type="email" placeholder="Email" name="email" onChange={this.handleChange} />
                </Form.Group>

                <Form.Group className="login-box" >
                    <Form.Control required type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                </Form.Group>

                <button className="login-button" type="submit">Sign Up</button>
            </Form>

            <div className="login-switch">
                <hr/>
                <Link to="/login">
                <button className="login-button">Login</button>
                </Link>
            </div>
            </div>
        </div>
        )
    }
}