import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';
const User = props => {
    let customPath = "";
    if(props.user.image){
        customPath = 'images/' + props.user.image;
    }
    return(
        <tr>
            <td>{props.user.firstName}</td>
            <td>{props.user.lastName}</td>
            <td>{props.user.email}</td>
            <td>{props.user.mobile}</td>
            <td><img className ="profile" src={customPath} alt="image"/></td>
            <td>
                <Link to={"/edit/"+props.user._id}>Edit</Link> | <a href="#" onClick={() =>  props.deleteUser(props.user._id)}>Delete</a>
            </td>
        </tr>
    )
}
export class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5020/user/')
            .then(res => {
                this.setState({ users: res.data });
            })
            .catch(err => console.log(err));
    }

    deleteUser = (id) => {
        axios.delete('http://localhost:5020/user/'+id)
            .then(res => console.log(res.data));

            this.setState({
                users: this.state.users.filter(data => data._id !== id)
            })
    }

    userLists = () => {
        return this.state.users.map(currentUser => {
            return <User user={currentUser} deleteUser={() => this.deleteUser(currentUser._id)} key={currentUser._id} />
        })
    }
    render() {
        return (
            <div>
                <h3>Users</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>firstName </th>
                            <th>lastName </th>
                            <th>email </th>
                            <th>mobile </th>
                            <th>image</th>
                            <th>Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.userLists()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default UserList;