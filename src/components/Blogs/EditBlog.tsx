import React, {Component} from "react";
import { Form, Button, Modal, ModalBody, ModalDialog, Offcanvas } from 'react-bootstrap';

type Info ={
    blogcontent: string
    feeling: string
}

type props = {
  show: string
  blogId: string
  sessionToken: string
  refresh?: any
}

export default class EditBlog extends Component<props,Info>{
    constructor(props: any){
        super(props)
        this.state ={
            blogcontent: '',
            feeling: ''
        }
    }

    handleChange = (event: any) => {
        switch(event.target.name){
            case "editInput":
                this.setState({blogcontent: event.target.value})
                break;
            case "optionChange":
                this.setState({feeling: event.target.value})
                break;
        }
    }

    editblog = () => {
        fetch(`http://localhost:4000/blog/${this.props.blogId}`,{
            method: 'PUT',
            body: JSON.stringify({
                blogcontent: this.state.blogcontent,
                feeling: this.state.feeling}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.sessionToken})
        })
        .then(this.props.refresh)
        .catch(err => console.log(err))
    }

    render(){
      if (this.props.show == this.props.blogId) {
        return(
          <div className={`edit`}>
              <input onChange={this.handleChange} name="editInput"></input>
              <select onChange={this.handleChange} name="optionChange">
                  <option>Choose an Option</option>
                  <option value="true">Good</option>
                  <option value="false">Bad</option>
              </select>
              <button onClick={this.editblog}>Save</button>
          </div>
        )
      } else {
        return (<div></div>)
      }
    }
}
