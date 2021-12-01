import { settings } from "cluster";
import React, {Component} from "react";

type comments ={
  content: string
  id: string
  createdAt: string
}
type Info = {
    comment: any[]

}

type Props ={
 comments: Array<comments>

}

export default class Comments extends Component<Props,Info>{
        constructor(props: Props){
            super(props)
            this.state ={
                comment: []
            }
        }

        render(){
          return(
            this.props.comments.map((comment) => {
              return <li>{comment.content}</li>
            })
          )
    }
  }
