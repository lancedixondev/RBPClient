import React, {Component} from "react";
import { Form, Button } from 'react-bootstrap';



type Credentials ={
    password: string
    id: number
}

export default class ResetPassword extends Component <{},Credentials>{
    constructor(props: any){
        super(props)
        this.state ={
            password: '',
            id: 0
        }
    }

    

    handleChange = (event: any) =>{
        switch(event.target.name){
            case "password":
                this.setState({password: event.target.value})
                break;
        }
    }

    handleSubmit = (event: any) => {
        event.preventDefault();

        fetch(`http://localhost:4000/user/${this.state.id}`,{
            method: 'PUT',
            body: JSON.stringify({
                password: this.state.password}),
            headers: new Headers({'Content-Type': 'application/json'})
        })
        .then((response) => response.json())
        .catch((error) => console.log("Password change Error:", error))
    }




    render(){
        return(
            <div>
                <h1>Change Password</h1>
                <Form onSubmit={this.handleSubmit} style={{margin:"30px"}}>

                <Form.Group className="mb-3" >
                    <Form.Control required type="password" placeholder="New Password" name="password" onChange={this.handleChange} />
                </Form.Group>

                <Button className='login-button' variant="primary" type="submit">
                    Change Pass
                </Button>
            </Form>
            </div>
        )
    }
}