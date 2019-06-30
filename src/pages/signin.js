import React, { Component } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import { signIn } from '../redux/actions/authActions';
import { Link } from 'react-router-dom';
class SignIn extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            email: "",
            password: ""
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
        const {email, password} = this.state;

        if(email !== "" || email!== " ")
        {
            if(password !== "" || password !== " ")
            {
                this.props.signIn({email, password});
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
        const { email, password } = this.state;
        return(
            <div 
                className="d-flex justify-content-center"
                style={{marginTop: "100px"}} 
            >
                <div style={{border: "1px solid gray", padding: "30px", borderRadius: "5px"}} className="col-md-6 col-lg-5 col-sm-8">
                    <div className="form-group">
                        <label>Emial:</label>
                        <input type = "email" className="form-control" placeholder="Email" value={email} onChange={this.handleChange('email')}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Password" value={password} onChange={this.handleChange('password')}/>
                    </div>
                    <div className="from-group" style={{marginBottom: "12px"}} >
                        <Link to="/signup">Create an account ?</Link>
                    </div>
                    <div className="from-group">
                        <button className="btn btn-success login-btn" onClick={this.handleClick}>LogIn</button>
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
        signIn:(loginData) => dispatch(signIn(loginData)),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);