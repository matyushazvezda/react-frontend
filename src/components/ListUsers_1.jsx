import React, { Component } from 'react';
import UserService from '../services/UserService';

class ListUsers extends Component {

    constructor(props){
        super(props)
        this.state = {
            users: []
        }
    }
    componentDidMount(){
       UserService.getUsers().then((res) =>{
            this.setState({users: res.data});
       });
    }
    render() {
        return (
            <div>
                <h2 className='text-center'>Список пользователей</h2>
                <div className='row'>
                    <table className='table table-striped table-bordered'>
                       <thead>
                        <tr>
                            <th>Name</th>
                            
                            <th>email</th>
                            <th>password</th>
                        </tr>
                        </thead>

                        <tbody>
                          {
                            this.state.users.map(
                                users =>
                                <tr key={users.id}>
                                    <td>{users.name}</td>
                                    <td>{users.email}</td>
                                    <td>{users.password}</td>
                                </tr>
                            )
                          }  
                        </tbody> 
                    </table>
                </div>
            </div>
        );
    }
}

export default ListUsers;
