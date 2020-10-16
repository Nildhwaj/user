import React, { Component } from 'react';
import axios from 'axios';
import ImageUploader from 'react-images-upload';


export class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName:'',
            lastName:'',
            email:'',
            mobile:'',
            image:{},
            valid:true
        };
    }

    componentDidMount() {

        axios.get('http://localhost:5020/users/')
            .then(res => {
                if(res.data.length > 0){
                    this.setState({
                        users: res.data.map((user) => user.username),
                        username: res.data[0].username
                    });
                }
            });
    }
    onChangeFirstName = (e) => {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangeLastName = (e) => {
        this.setState({
            lastName: e.target.value
        });
    }

    onChangeUserEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    onChangeUserMobile = (e) => {
        this.setState({
            mobile: e.target.value
        });
    }

    onChangeUserImage = (e) => {
        
        let image = e.target.files[0]; 
        console.log("Uploaded Image",image)
        this.setState(() => ({ image: image }))
    }
    onSubmit = (e) => {
        e.preventDefault();
        var fd = new FormData();
        console.log("This is state image*********", this.state.image);
        fd.append('firstName', this.state.firstName);
        fd.append('lastName', this.state.lastName);
        fd.append('email', this.state.email);
        fd.append('mobile', this.state.mobile);
        fd.append('image', this.state.image);
        axios.post("http://localhost:5020/user/add", fd)
            .then(res => { 
                console.log("Response of created user",res)
                window.location = "/";
                console.log(res.data);
                this.clearData();
            }
            )
            .catch(err => console.log(err))
        
    }

    clearData = () => {
        this.setState({
            firstName:'',
            lastName:'',
            email:'',
            mobile:'',
            image:{}
        });
    }

    validatePhone= (e) => {
        var reg = new RegExp('/^[1-9]{1}[0-9]{6,14}$/');
        
        if(!reg.test(e.target.value)){
            this.setState({
                valid: !this.state.valid
            })
        }
    }
    
    render() {
        return (
            <div>
                <h3>Create New User Log</h3>
                <form onSubmit={(e) => this.onSubmit(e)}>
                    <div className="form-group">
                        <label>First Name:</label>
                        <input 
                            type="text"
                            required
                            className="form-control"
                            value={this.state.firstName}
                            onChange={(e) => this.onChangeFirstName(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.lastName}
                            onChange={(e) => this.onChangeLastName(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input 
                            type="email"
                            required
                            className="form-control"
                            value={this.state.email}
                            onChange={(e) => this.onChangeUserEmail(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Mobile: </label>
                        <input 
                            type="text"
                            required
                            className="form-control"
                            value={this.state.mobile}
                            onChange={(e) => this.onChangeUserMobile(e)}
                            onBlur={(e) => this.validatePhone(e)}
                        />
                        <div>{this.state.valid ? '': 'Invalid Number'}</div>
                    </div>
                    <div className="form-group">
                        <label>Image: </label>
                        <input 
                            type="file"
                            required
                            name="image"
                            className="form-control"
                            onChange={(e) => this.onChangeUserImage(e)}
                        />
                    </div>
                    <div className="form-group">
                    {this.state.valid === false ? <input type="submit" value="Create User" className="btn btn-primary" disabled /> : <input type="submit" value="Create User" className="btn btn-primary"  />}
                    </div>
                </form> 
            </div>
        )
    }
}

export default CreateUser;