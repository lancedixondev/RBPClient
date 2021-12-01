import React, {Component} from "react";

type T ={

}

type Info ={
    posts: Array<T>
}

export default class AdminPostDelete extends Component<{},Info>{
    constructor(props: any){
        super(props)
        this.state ={
            posts: []
        }
    }

     fetchpost = () =>{

        fetch('http://localhost:4000/posts/adminposts', {
        method: 'GET',
        headers: new Headers ({
            'Content-Type': 'application/json',
        })
    })
    .then(response => response.json())
    .then(json => this.setState({posts: json}))
    .catch(err => console.log(err))
    }

    deletepost = (id: any) => {
        fetch(`http://localhost:4000/posts/${id}`, {
            method: 'DELETE',
            headers: new Headers ({
                'Content-Type': 'application/json',
            })
        })
        .then(this.fetchpost)
        .catch(err => console.log(err))
    }

    componentDidMount(){
        this.fetchpost()
    }


    render(){
        return(
            <div>
                {this.state.posts.map((post:any) => {
                    console.log(post)
                    return(
                        
                        <div> <ul>{post.content} <button className='redx' onClick={() => this.deletepost(post.id)}>X</button></ul></div>
                    )
                })}
            </div>
        )
    }
}