import React, {Component} from "react";
import BlogDisplay from "../Blogs/BlogDisplay";
import Navbar from '../Navbar'
import CreatePosts from '../Posts/CreatePosts'


type Props = {
    sessionToken: string
}

export default class HomePage extends Component <Props,{}>{
    constructor(props: any){
        super(props)
        this.state={
        }
    }

    render(){
        return(
        <div className='homepage'>
            <div className='content-container'>
                <div className='home-page-blogs'>
                    <BlogDisplay sessionToken={this.props.sessionToken} />
                </div>
                <div className='home-page-posts'>
                    <CreatePosts sessionToken={this.props.sessionToken} />
                </div>
            </div>
        </div>)
    }
}


