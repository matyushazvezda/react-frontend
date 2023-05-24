import React, { Component } from 'react';
import UserService from '../services/UserService'; 

class ListUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        UserService.getUsers().then((res) => {
            this.setState({ users: res.data });
        });
    }

    render() {
        return (
            <div className="container">
                <h2 className="text-center">Список пользователей</h2>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.password}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListUsers;
