import React, { Component } from 'react';
import axios from 'axios';



export class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName:'',
            lastName:'',
            email:'',
            mobile:'',
            image:'',
            hide:false,
            valid:true

        };
    }

    componentDidMount() {

        axios.get('http://localhost:5020/user/'+this.props.match.params.id)
            .then(res => {
                this.setState({ 
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email,
                    mobile: res.data.mobile,
                    image: res.data.image
                });
            })
            .catch(err => console.log(err));

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
        this.setState({
            image: e.target.files[0]
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('firstName', this.state.firstName);
        fd.append('lastName', this.state.lastName);
        fd.append('email', this.state.email);
        fd.append('mobile', this.state.mobile);
        fd.append('image', this.state.image);
        axios.post("http://localhost:5020/user/update/"+this.props.match.params.id, fd)
            .then(res => {
                window.location = "/"; 
                console.log(res.data)
                this.clearData(); 
            });
    
    }
    onChangeHideImage = (e) =>{
        this.setState({
            hide : !this.state.hide
        })
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
        let customPath = "";
        if(this.state.image){
            customPath = '/images/'+this.state.image;
        }
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
                            type="number"
                            required
                            className="form-control"
                            value={this.state.mobile}
                            onChange={(e) => this.onChangeUserMobile(e)}
                            onBlur={(e) => this.validatePhone(e)}
                        />
                        <div>{this.state.valid ? '': 'Invalid Number'}</div>
                    </div>

                    <div className="form-group">
                        <label>Upload Image: </label>
                        {this.state.hide ? "" : <img className="profile" src={customPath} alt="Profile Picture"/>}
                        <input 
                            type="file"
                            className="form-control"
                            name="image"
                            onChange={(e) => this.onChangeUserImage(e)}
                            onBlur={(e) => this.onChangeHideImage(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update User" className="btn btn-primary" />
                    </div>
                </form> 
            </div>
        )
    }
}

export default EditUser;