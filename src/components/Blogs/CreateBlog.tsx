import React, {Component} from "react";
import { Form} from 'react-bootstrap';
import EditBlog from "./EditBlog";
import GetBlogs from './GetBlogs'

type Info ={
    blogcontent: string,
    feeling: string
}

type Props ={
    sessionToken: string
}

export default class Blog extends Component <Props,Info>{
    constructor(props: Props){
        super(props)
        this.state ={
            blogcontent: '',
            feeling: ''
        }
    }

    handleChange = (event: any) =>{
        switch(event.target.name){
            case "blogcontent":
                this.setState({blogcontent: event.target.value})
                break;
        }
    }

    handleOptions = (event: any) => {
        this.setState({feeling: event.target.value})
    }

    handleSubmit = () => {

        fetch(`http://localhost:4000/blog/create`,{
            method: 'POST',
            body: JSON.stringify({
                blogcontent: this.state.blogcontent,
                feeling: this.state.feeling}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.sessionToken})
        })
        .then((response) => console.log(response.json()))
        .then((json) => {
            console.log(json);
        })
        .catch((error) => console.log("blog creation error", error))

        console.log(this.state.blogcontent)
    }

    wrapperFunction = () => {
        this.handleSubmit()
    }



    render(){
        return(
            <div className='blog-create'>
                <h1>Daily Mood</h1>
                <p>Choose your mood, and create a post as to why you feel like that! Everything here is private.</p>
                <Form onSubmit={this.wrapperFunction} style={{margin:"30px"}}>

                <Form.Select className='blog-create-select'aria-label="Default select example" onChange={this.handleOptions}> 
                    <option value=''>How do you feel today?</option>
                    <option onChange={this.handleOptions} value="true">Good</option>
                    <option onChange={this.handleOptions} value="false" >Bad</option>
                </Form.Select>
                <br/>

                <textarea placeholder="What do you want to say about today?" name="blogcontent" onChange={this.handleChange}></textarea>
                    <br/>

                <button type="submit">Submit</button>
            </Form>
            <GetBlogs sessionToken={this.props.sessionToken}/>
            </div>
        )
    }
}