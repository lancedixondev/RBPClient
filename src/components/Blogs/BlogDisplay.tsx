import React, {Component} from "react";
import CreateBlog from './CreateBlog'

type Props ={
    sessionToken: string
}
export default class BlogDisplay extends Component <Props, {}>{





    render(){
        return(
            <div className="blogcontainer">
                <div><CreateBlog sessionToken={this.props.sessionToken}/></div>
            </div>
        )
    }

}