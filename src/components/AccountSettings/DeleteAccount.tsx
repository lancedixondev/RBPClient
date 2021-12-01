import React, {Component} from "react";
import {  Button } from 'react-bootstrap';



type Credentials ={
    id: number
}

export default class DeleteAccount extends Component <{},Credentials>{
    constructor(props: any){
        super(props)
        this.state ={
            id: 0
        }
    }


    handleSubmit = (event: any) => {
        event.preventDefault();

        fetch(`http://localhost:4000/user/${this.state.id}`,{
            method: 'DELETE',
            headers: new Headers({'Content-Type': 'application/json'})
        })
        .then((response) => response.json())
        .catch((error) => console.log("Fat error deleting that shit:", error))
    }




    render(){
        return(
            <div>
                <h1>Delete Account?</h1>
                <Button className="login-button" onClick={this.handleSubmit} style={{margin:"30px"}}> Delete Account</Button>

            </div>
        )
    }
}