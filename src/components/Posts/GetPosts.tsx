import React, {Component} from "react";
import Comments from './Comments'
import CreateComment from './CreateComment'
import DeleteIcon from '../../Assets/bin.png'

type T = {

}
type Info = {
    content: any[]
}
type Props ={
    sessionToken: string
}

export default class GetPosts extends Component<Props,Info>{
        constructor(props: Props){
            super(props)
            this.state ={
                content: []
            }
        }



    fetchposts = () =>{

        fetch('http://localhost:4000/posts/allposts', {
        method: 'GET',
        headers: new Headers ({
            'Content-Type': 'application/json'
        })
    })
    .then(response => response.json())
    .then(json => this.setState({content: json}))
    .catch(err => console.log(err))
    }

    deletepost = (id: any) => {
        fetch(`http://localhost:4000/posts/delete/${id}`, {
            method: 'DELETE',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        })
        .then(this.fetchposts)
        .catch(err => console.log(err))
    }

    componentDidMount(){
        this.fetchposts()
    }

    render(){
        if(this.state.content == null){
            return(<></>)
        } else {
            return(
                <div className='comment-container'>
                <div className='comment-map'>
                {this.state.content.map((post:any, index) => {
                  if(post.comments !== undefined){
                      console.log(post)
                    return(
                      <div className='post-content-container'>
                          <br></br>
                          <br></br>
                        <div className="post-content">{post.content}<img className='blog-action-icon-delete' src={DeleteIcon} onClick={() => this.deletepost(post.id)} alt='deleteicon'/></div>
                        <ul className='comment-list'><Comments comments={post.comments} /></ul>
                        <CreateComment sessionToken={this.props.sessionToken} postId={post.id} fetchpost={this.fetchposts}/>
                        <br></br>
                        <br></br>
                      </div>
                    )
                } else {
                  return(
                    <li>
                      <div className="post-content">{post.content}</div>
                    </li>
                  )
                }
                })}
                </div>
                </div>
            )
        }
    }

}
