import React, {Component} from "react";
import { Form} from 'react-bootstrap';




type Credentials ={
    content: string,
}

type Props ={
    sessionToken: string
    postId: string
    fetchpost?: any
}

export default class CreateComment extends Component <Props,Credentials>{
    constructor(props: Props){
        super(props)
        this.state ={
            content: '',
        }
    }

    

    handleChange = (event: any) =>{
        switch(event.target.name){
            case "comment":
                this.setState({content: event.target.value})
                break;
        }
    }

    handleSubmit = (event: any) => {
        event.preventDefault();

        fetch(`http://localhost:4000/comments/comment`,{
            method: 'POST',
            body: JSON.stringify({ 
                comment:{
                content: this.state.content,
                postId: this.props.postId}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.sessionToken})
        })
        .then(this.props.fetchpost)
        .catch((error) => console.log("comment Error:", error))
    }


    render(){
        return(
            <div className="create-comment">
                    <textarea className="commentbox" placeholder="Enter comment" name="comment" onChange={this.handleChange} />
                    <br/>
                    <button className="login-button" onClick={this.handleSubmit} type="submit">Comment</button>
            </div>
        )
    }
}