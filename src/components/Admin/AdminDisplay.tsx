import React, {Component} from "react";
import AdminUser from "../Admin/AdminUserDelete";
import AdminPost from '../Admin/AdminPostDelete'
import Navbar from '../Navbar'

export default class AdminPage extends Component <{},{}>{
    constructor(props: any){
        super(props)
        this.state={
        }
    }

    render(){
        return(
        <div className='homepage'>
            <div className='adminpagetitle'><h1>Admin Page</h1></div>
            <div className='content-container'>
                <div className='home-page-blogs'>
                    <h2>Delete Users</h2>
                    <AdminUser />
                </div>
                <div className='home-page-posts'>
                    <h2>Delete Posts</h2>
                    <AdminPost />
                </div>
            </div>
        </div>)
    }
}


