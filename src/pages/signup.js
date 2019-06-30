import React, { Component } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import { signUp } from '../redux/actions/authActions';
import { Link } from 'react-router-dom';
class SignUp extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            passwordError: "",
            confrom_password: "",
            emailError: "",
            nameError: "",
        }
    }

    componentDidMount()
    {
        const { user } = this.props;
        
        if(user)
        {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps)
    {
        const { user } = nextProps;

        if(user)
        {
            this.props.history.push('/dashboard');
        }
        else
        {
            alert(nextProps.authError);
        }
    }

    handleClick = (event) =>{
        event.preventDefault();
        const { name, email, password, confrom_password } = this.state;
        // console.log({ name, email, password, confrom_password })

        if(email !== "" && email!== " ")
        {
            if(password !== "" && password !== " ")
            {
                if(password === confrom_password)
                {
                    this.props.signUp({email, password, name});
                }
                else
                {
                    alert("Password does not match");
                }
            }
            else
            {
                alert("Please enter your password");
            }
        }
        else
        {
            alert("Please enter your email");
        }
        
    }

    handleChange = name => (event) =>{
        this.setState({[name]: event.target.value});
    }

    render(){
        const { email, password, name, confrom_password, nameError, emailError, passwordError } = this.state;
        return(
            <div style={{marginTop: "80px"}} className="d-flex justify-content-center">
                <div style={{border: "1px solid gray", padding: "30px", borderRadius: "5px"}} className="col-md-6 col-lg-5 col-sm-8">
                    <div className="form-group">
                        <label>Name</label>
                        <input 
                            type="name" 
                            className="form-control" 
                            placeholder="Name" value={name} 
                            onChange={this.handleChange('name')} 
                        />  
                        <small className ="form-text text-muted">{nameError}</small>                      
                    </div>
                    <div className="form-group">
                        <label>Emial:</label>
                        <input 
                            type = "email" 
                            className="form-control" 
                            placeholder="Email" 
                            value={email} 
                            onChange={this.handleChange('email')}
                        />
                        <small className ="form-text text-muted">{emailError}</small>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Password" 
                            value={password} 
                            onChange={this.handleChange('password')}
                        />
                        <small className ="form-text text-muted">{passwordError}</small>
                    </div>
                    <div
                        className="form-group"
                    >
                        <label>Confrom Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confrom Password"
                            value={confrom_password}
                            onChange = {this.handleChange("confrom_password")}
                        />
                        <small>{}</small>
                    </div>
                    <div className="from-group" style={{marginBottom: "12px"}} >
                        <Link to="/signin">Already have an account?</Link>
                    </div>
                    <div className="from-group">
                        <button 
                            className="btn btn-success login-btn" 
                            onClick={this.handleClick}
                        >SignUp</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return({
        authError: state.authReducer.authError,
        user: state.authReducer.user
    })
}

const mapDispatchToProps = (dispatch) =>{
    return({
        signUp:(loginData) => dispatch(signUp(loginData)),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);