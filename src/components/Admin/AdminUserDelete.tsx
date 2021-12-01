import React, {Component} from "react";

type T ={

}

type Info ={
    users: Array<T>
}

export default class AdminUserDelete extends Component<{},Info>{
    constructor(props: any){
        super(props)
        this.state ={
            users: []
        }
    }

     fetchusers = () =>{

        fetch('http://localhost:4000/user/allusers', {
        method: 'GET',
        headers: new Headers ({
            'Content-Type': 'application/json',
        })
    })
    .then(response => response.json())
    .then(json => this.setState({users: json}))
    .catch(err => console.log(err))
    }

    deleteuser = (id: any) => {
        fetch(`http://localhost:4000/user/${id}`, {
            method: 'DELETE',
            headers: new Headers ({
                'Content-Type': 'application/json',
            })
        })
        .then(this.fetchusers)
        .catch(err => console.log(err))
    }

    componentDidMount(){
        this.fetchusers()
    }


    render(){
        return(
            <div>
                {this.state.users.map((user:any) => {
                    return(
                        
                        <div> <ul>{user.firstName} <button className='redx' onClick={() => this.deleteuser(user.id)}>X</button></ul></div>
                    )
                })}
            </div>
        )
    }
}