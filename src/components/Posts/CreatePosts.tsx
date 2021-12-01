import React, {Component} from "react";
import { Form} from 'react-bootstrap';
import GetPosts from './GetPosts'

type Props ={
    sessionToken: string
}
type Info ={
    title: string,
    content: string
}

export default class CreatePost extends Component <Props,Info>{
    constructor(props: Props){
        super(props)
        this.state ={
            title: '',
            content: ''
        }
    }


    handleChange = (event: any) =>{
        switch(event.target.name){
            case "title":
                this.setState({title: event.target.value})
                break;
            case "content":
                this.setState({content: event.target.value})
                break;
        }
    }




handleSubmit = () => {

    fetch(`http://localhost:4000/posts/post`,{
        method: 'POST',
        body: JSON.stringify({
            title: this.state.title,
            content: this.state.content}),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.props.sessionToken})
    })
    .then((response) => console.log(response.json()))
    .then((json) => {console.log(json);})
    .catch((error) => console.log("post creation error", error))
}


render(){
    return(
        <div className='post-create'>
            <h1>Status</h1>
            <p>Reach out and interact with others! </p>
            <Form onSubmit={this.handleSubmit} style={{margin:"30px"}}>
            <textarea className="post" placeholder="What's on your mind?'" name="content" onChange={this.handleChange}></textarea>
            <br></br>

            <button className="post-button" type="submit">Submit</button>
        </Form>
            <GetPosts sessionToken={this.props.sessionToken} />
        </div>
    )
}

}