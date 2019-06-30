import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { signOut } from '../redux/actions/authActions';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         }
    }

    componentWillReceiveProps(nextProps)
    {
        if(!nextProps.user)
        {
            window.location.assign('/signin');
        }
    }

    logOut = () =>{
        this.props.signOut();
    }
    render() {
        const { user } = this.props;
        return ( 
            <div className="d-flex flex-row justify-content-center">
                <div  style={{justifyContent: "center"}} className="col-10  py-3 App-header">
                    <h1>I-Realtime Auction App</h1>
                </div>
                <div className="col-2  py-3 App-header">
                    {user ? <Button onClick = {() => this.logOut()} >Logout</Button> : null}
                </div>
            </div>
         );
    }
}

const mapStateToProps = (state) =>{
    return({
        user: state.authReducer.user
    })
}

const mapDispatchToProps = (dispatch) =>{
    return({
        signOut: () => dispatch(signOut())
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);