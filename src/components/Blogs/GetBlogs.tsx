import React, {Component} from "react";
import { Form, Button, Modal, Offcanvas } from 'react-bootstrap';
import EditBlog from './EditBlog'
import GoodIcon from '../../Assets/good-review.png';
import BadIcon from '../../Assets/bad-review.png'
import DeleteIcon from '../../Assets/bin.png'
import EditForm from '../../Assets/edit.png'
import EditBlogs from './EditBlog'

type T ={

}

type Info ={
    blogs: Array<T>
    show: string
    blogcontent: string
    feeling: string
    blogid: string
}

type Props ={
    sessionToken: string

}

export default class GetBlog extends Component<Props,Info>{
    constructor(props: Props){
        super(props)
        this.state ={
            blogs: [],
            show: '',
            blogcontent: '',
            feeling: '',
            blogid: ''
        }
    }

    handleChange = (event: any) => {
        switch(event.name){
            case "editInput":
                this.setState({blogcontent: event.target.value})
                break;
            case "optionChange":
                this.setState({feeling: event.target.value})
                break;
        }
    }

     fetchblogs = () =>{

        fetch('http://localhost:4000/blog/myblogs', {
        method: 'GET',
        headers: new Headers ({
            'Content-Type': 'application/json',
            'Authorization': this.props.sessionToken
        })
    })
    .then(response => response.json())
    .then(json => this.setState({blogs: json}))
    .catch(err => console.log(err))
    }

    deleteblog = (id: any) => {
        fetch(`http://localhost:4000/blog/${id}`, {
            method: 'DELETE',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        })
        .then(this.fetchblogs)
        .catch(err => console.log(err))
    }

    componentDidMount(){
        this.fetchblogs()

    }

    render(){
        if(this.state.blogs === undefined){
            return <div></div>
        } else {
            return(
                <div className='Edit-Container'>
                    {this.state.blogs.map((blog:any, index) =>
                        {
                          if(blog.feeling === "true"){
                            return(
                                <div>
                                    <img className='bad-icon' src={GoodIcon} alt='red'/>
                                    {blog.blogcontent}
                                    <img className='blog-action-icon-delete' src={DeleteIcon} onClick={() => this.deleteblog(blog.id)} alt='deleteicon'/>
                                    <img id={blog.id} src={EditForm} className='blog-action-icon' alt='goodicon' onClick={(e) => {
                                      if(this.state.show == e.currentTarget.id) {
                                        this.setState({show: ''})
                                      } else {
                                        this.setState({show: e.currentTarget.id})
                                      }
                                    }} />
                                    <EditBlog show={this.state.show} blogId={blog.id} sessionToken={this.props.sessionToken} refresh={this.fetchblogs}/>
                                    <hr/>
                                </div>

                            )
                        } else {
                            return(
                            <div>
                              <img className='bad-icon' src={BadIcon} alt='red'/>
                              {blog.blogcontent}
                              <img className='blog-action-icon-delete' src={DeleteIcon} onClick={() => this.deleteblog(blog.id)} alt='deleteicon'/>
                              <img id={blog.id} src={EditForm} className='blog-action-icon' alt='goodicon' onClick={(e) => {
                                if(this.state.show == e.currentTarget.id) {
                                  this.setState({show: ''})
                                } else {
                                  this.setState({show: e.currentTarget.id})
                                }
                              }} />
                              <EditBlog show={this.state.show} blogId={blog.id} sessionToken={this.props.sessionToken}/>
                              <hr/>
                            </div>

                            )
                        }}
                    )}
                </div>
            )
        }
    }
}
